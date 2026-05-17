/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Centralized game state with persistence in LocalStorage. The state
 * machine is intentionally simple: idle → rolling → moving →
 * challenge → idle, with a final 'victory' state.
 *
 * Movement is strictly monotonic forward. The internal stepOne()
 * advances `position` by exactly 1 (clamped to the last tile) — never
 * sideways and never backwards.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { BOARD } from '@/data/board';
import { CHALLENGES, getChallengeById } from '@/data/challenges';
import { ACHIEVEMENTS } from '@/data/achievements';
import type {
  Achievement,
  AvatarId,
  Challenge,
  PlayerProgress,
} from '@/types/game';
import { audio } from '@/services/audio';

export type GameStatus =
  | 'idle'
  | 'rolling'
  | 'moving'
  | 'challenge'
  | 'feedback'
  | 'victory'
  | 'gameover';

/**
 * Description of what will happen to the player when they close the
 * current challenge feedback. The UI uses this to communicate the
 * spatial consequence of the answer ("+1 step forward" / "Back to the
 * bridge").
 */
export interface ChallengeOutcome {
  type: 'advance' | 'retreat' | 'stay';
  /** Tile index the player will be at when the feedback closes. */
  toIndex: number;
  /** Number of tiles forward (advance) or backward (retreat). */
  delta: number;
  /** Friendly label shown on the modal feedback. */
  label: string;
}

export interface GameStateView extends PlayerProgress {
  status: GameStatus;
  diceValue: number | null;
  pendingMoves: number;
  currentChallenge: Challenge | null;
  lastAnswerCorrect: boolean | null;
  pendingOutcome: ChallengeOutcome | null;
  streak: number;
  unlocked: Achievement[];
  /** Position progress, 0..1, useful for the progress bar. */
  progress: number;
}

const newProgress = (avatarId: AvatarId): PlayerProgress => ({
  avatarId,
  position: 0,
  score: 0,
  lives: 3,
  coins: 0,
  stars: 0,
  level: 1,
  challengesAnswered: 0,
  challengesCorrect: 0,
  startedAt: Date.now(),
});

const SCORE_CORRECT = 100;
const COINS_CORRECT = 5;
const STAR_THRESHOLD = 3; // every 3 correct streak → +1 star

export const useGameState = (initialAvatar: AvatarId) => {
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    const saved = storage.get<PlayerProgress | null>(
      STORAGE_KEYS.progress,
      null,
    );
    if (saved && saved.avatarId === initialAvatar && saved.position < BOARD.total - 1) {
      return saved;
    }
    return newProgress(initialAvatar);
  });

  const [status, setStatus] = useState<GameStatus>('idle');
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [pendingMoves, setPendingMoves] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [pendingOutcome, setPendingOutcome] = useState<ChallengeOutcome | null>(null);
  const [streak, setStreak] = useState(0);
  const [unlocked, setUnlocked] = useState<Achievement[]>(() =>
    storage.get<Achievement[]>(STORAGE_KEYS.achievements, []),
  );

  const rngRef = useRef<() => number>(() => Math.random());

  // Persist progress as it changes.
  useEffect(() => {
    storage.set(STORAGE_KEYS.progress, progress);
  }, [progress]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.achievements, unlocked);
  }, [unlocked]);

  const unlockAchievement = useCallback((id: string) => {
    const def = ACHIEVEMENTS.find((a) => a.id === id);
    if (!def) return;
    setUnlocked((prev) => {
      if (prev.some((a) => a.id === id)) return prev;
      return [...prev, def];
    });
  }, []);

  const rollDice = useCallback(() => {
    if (status !== 'idle') return;
    setStatus('rolling');
    audio.play('roll');
    const value = 1 + Math.floor(rngRef.current() * 6);
    // small delay handled by UI animation; the value is set immediately
    setTimeout(() => {
      setDiceValue(value);
      setPendingMoves(value);
      setStatus('moving');
    }, 700);
  }, [status]);

  const stepOne = useCallback(() => {
    if (status !== 'moving') return;
    if (pendingMoves <= 0) return;
    audio.play('step');
    setProgress((p) => {
      const next = Math.min(p.position + 1, BOARD.total - 1);
      if (p.position === 0 && next === 1) {
        unlockAchievement('first-step');
      }
      return { ...p, position: next };
    });
    setPendingMoves((m) => m - 1);
  }, [pendingMoves, status, unlockAchievement]);

  // When movement finishes, decide whether to trigger a challenge or end the game.
  useEffect(() => {
    if (status !== 'moving') return;
    if (pendingMoves > 0) return;

    const tile = BOARD.tiles[progress.position];
    if (!tile) return;

    if (tile.type === 'castle-end') {
      setStatus('victory');
      audio.play('victory');
      return;
    }

    if (tile.challenge) {
      // Pick the tile's bespoke contextual challenge (e.g., "the dragon
      // is next to this bridge"). Fall back to a random challenge if a
      // tile has no specific id.
      const contextual = tile.challengeId ? getChallengeById(tile.challengeId) : undefined;
      const choice =
        contextual ?? CHALLENGES[Math.floor(rngRef.current() * CHALLENGES.length)];
      setCurrentChallenge(choice);
      setStatus('challenge');
    } else {
      setStatus('idle');
      setDiceValue(null);
    }
  }, [pendingMoves, status, progress.position]);

  const answerChallenge = useCallback(
    (optionId: string) => {
      if (!currentChallenge || status !== 'challenge') return;
      const correct = optionId === currentChallenge.correctId;
      setLastAnswerCorrect(correct);
      setStatus('feedback');

      const here = progress.position;
      const tile = BOARD.tiles[here];

      if (correct) {
        audio.play('correct');
        // ✔ Bonus advance: take one extra step toward the castle.
        const nextIndex = Math.min(BOARD.total - 1, here + 1);
        const delta = nextIndex - here;
        setPendingOutcome({
          type: delta > 0 ? 'advance' : 'stay',
          toIndex: nextIndex,
          delta,
          label:
            delta > 0
              ? `Great! You move +${delta} step forward.`
              : 'Great! You stay safe.',
        });
        setProgress((p) => {
          const newStreak = streak + 1;
          const earnedStar = newStreak > 0 && newStreak % STAR_THRESHOLD === 0;
          return {
            ...p,
            score: p.score + SCORE_CORRECT,
            coins: p.coins + COINS_CORRECT,
            stars: earnedStar ? p.stars + 1 : p.stars,
            challengesAnswered: p.challengesAnswered + 1,
            challengesCorrect: p.challengesCorrect + 1,
          };
        });
        setStreak((s) => {
          const ns = s + 1;
          if (ns >= 3) unlockAchievement('good-listener');
          if (currentChallenge.category === 'directions') {
            const total = CHALLENGES_DIRECTIONS_COUNT.get();
            CHALLENGES_DIRECTIONS_COUNT.inc();
            if (total + 1 >= 5) unlockAchievement('compass-master');
          } else if (currentChallenge.category === 'past') {
            const total = CHALLENGES_PAST_COUNT.get();
            CHALLENGES_PAST_COUNT.inc();
            if (total + 1 >= 5) unlockAchievement('time-traveler');
          }
          return ns;
        });
      } else {
        audio.play('wrong');
        // ✘ Retreat: fall back to the tile's safe checkpoint.
        const safe = Math.max(0, Math.min(here, tile?.retreatTo ?? Math.max(0, here - 2)));
        const delta = here - safe;
        setPendingOutcome({
          type: delta > 0 ? 'retreat' : 'stay',
          toIndex: safe,
          delta,
          label:
            delta > 0
              ? `Move back ${delta} step${delta === 1 ? '' : 's'} to a safe place.`
              : 'You stay where you are. Try the next one!',
        });
        setProgress((p) => ({
          ...p,
          lives: Math.max(0, p.lives - 1),
          challengesAnswered: p.challengesAnswered + 1,
        }));
        setStreak(0);
      }
    },
    [currentChallenge, status, streak, progress.position, unlockAchievement],
  );

  const closeChallenge = useCallback(() => {
    if (status !== 'feedback') return;
    // Apply the pending outcome: actually move the avatar on the board.
    const outcome = pendingOutcome;
    setCurrentChallenge(null);
    setLastAnswerCorrect(null);
    setPendingOutcome(null);
    setDiceValue(null);

    if (outcome && outcome.type !== 'stay') {
      setProgress((p) => ({ ...p, position: outcome.toIndex }));
    }

    if (progress.lives <= 0) {
      setStatus('gameover');
      return;
    }
    // If the bonus step lands on the castle, victory!
    if (outcome && outcome.toIndex >= BOARD.total - 1) {
      setStatus('victory');
      audio.play('victory');
      return;
    }
    setStatus('idle');
  }, [status, pendingOutcome, progress.lives]);

  const reset = useCallback(
    (avatarId: AvatarId) => {
      setProgress(newProgress(avatarId));
      setStatus('idle');
      setDiceValue(null);
      setPendingMoves(0);
      setCurrentChallenge(null);
      setLastAnswerCorrect(null);
      setPendingOutcome(null);
      setStreak(0);
      CHALLENGES_DIRECTIONS_COUNT.reset();
      CHALLENGES_PAST_COUNT.reset();
    },
    [],
  );

  const view: GameStateView = useMemo(
    () => ({
      ...progress,
      status,
      diceValue,
      pendingMoves,
      currentChallenge,
      lastAnswerCorrect,
      pendingOutcome,
      streak,
      unlocked,
      progress: progress.position / (BOARD.total - 1),
    }),
    [progress, status, diceValue, pendingMoves, currentChallenge, lastAnswerCorrect, pendingOutcome, streak, unlocked],
  );

  // Unlock the final achievement when victory is reached.
  useEffect(() => {
    if (status === 'victory') unlockAchievement('castle-saver');
  }, [status, unlockAchievement]);

  return {
    state: view,
    actions: {
      rollDice,
      stepOne,
      answerChallenge,
      closeChallenge,
      reset,
    },
  };
};

// Tiny counters kept outside of React state — only used for achievements.
const makeCounter = () => {
  let value = 0;
  return {
    inc: () => {
      value += 1;
    },
    get: () => value,
    reset: () => {
      value = 0;
    },
  };
};

const CHALLENGES_DIRECTIONS_COUNT = makeCounter();
const CHALLENGES_PAST_COUNT = makeCounter();
