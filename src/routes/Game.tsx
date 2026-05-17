/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Main play screen. React owns the high-level state (HUD, challenges,
 * score, dice value); Phaser owns the pixel-art world rendering.
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@/components/Header';
import { HUD } from '@/components/HUD';
import { Dice } from '@/components/Dice';
import { MiniMap } from '@/components/MiniMap';
import { ChallengeModal } from '@/components/ChallengeModal';
import { DialogBox } from '@/components/DialogBox';
import { PhaserGame } from '@/game/PhaserGame';
import { useGameState } from '@/hooks/useGameState';
import { useSettings } from '@/hooks/useSettings';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { INTRO_DIALOG } from '@/data/dialogs';
import { getAvatarById } from '@/data/avatars';
import { AvatarPreview } from '@/components/AvatarPreview';
import type { AvatarId } from '@/types/game';

export const Game = () => {
  const navigate = useNavigate();
  const { settings, update } = useSettings();
  const avatarId = storage.get<AvatarId>(STORAGE_KEYS.lastAvatar, 'aria');
  const avatar = getAvatarById(avatarId);
  const { state, actions } = useGameState(avatarId);
  const [showIntro, setShowIntro] = useState(true);

  // Walking: while pendingMoves > 0, automatically take one step every
  // ~260ms. We keep stepOne in a ref so the effect only re-runs when
  // the game's status or remaining moves change (not on every render).
  const stepOneRef = useRef(actions.stepOne);
  useEffect(() => {
    stepOneRef.current = actions.stepOne;
  }, [actions.stepOne]);

  useEffect(() => {
    if (state.status !== 'moving') return;
    if (state.pendingMoves <= 0) return;
    const id = window.setTimeout(() => stepOneRef.current(), 260);
    return () => window.clearTimeout(id);
  }, [state.status, state.pendingMoves]);

  // Navigate to victory page when finished.
  useEffect(() => {
    if (state.status === 'victory') {
      const id = window.setTimeout(() => navigate('/victory'), 1400);
      return () => window.clearTimeout(id);
    }
    if (state.status === 'gameover') {
      const id = window.setTimeout(() => navigate('/gameover'), 800);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [state.status, navigate]);

  // Persist final stats for the victory screen to pick up.
  useEffect(() => {
    if (state.status === 'victory') {
      storage.set('victory-summary', {
        avatarId,
        name: avatar.shortName,
        score: state.score,
        stars: state.stars,
        coins: state.coins,
        challengesAnswered: state.challengesAnswered,
        challengesCorrect: state.challengesCorrect,
        timeSeconds: Math.round((Date.now() - state.startedAt) / 1000),
      });
    }
  }, [state.status, state, avatar, avatarId]);

  const challengeOpen =
    state.status === 'challenge' || state.status === 'feedback';
  const canRoll = state.status === 'idle';

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />

      <main className="flex-1 px-3 sm:px-5 pb-3 flex flex-col lg:flex-row gap-3">
        {/* Left column: HUD strip + Phaser world (stacked) */}
        <section className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="panel-pixel-dark p-2 sm:p-3">
            <HUD
              score={state.score}
              stars={state.stars}
              coins={state.coins}
              lives={state.lives}
              level={state.level}
              progress={state.progress}
              streak={state.streak}
            />
          </div>
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-black/30 shadow-pixel bg-forest-700 min-h-[340px] h-[46vh] sm:h-[58vh] lg:flex-1 lg:min-h-[520px]"
            aria-label="Game world"
          >
            <PhaserGame avatarId={avatarId} position={state.position} />

            {/* Floating message: status */}
            <AnimatePresence>
              {state.status === 'moving' && state.pendingMoves > 0 && (
                <motion.div
                  key="moving"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 chip"
                >
                  {state.pendingMoves} step{state.pendingMoves !== 1 ? 's' : ''} left
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Side panel */}
        <aside className="w-full lg:w-80 flex flex-col gap-3">
          <div className="panel-pixel-dark p-3 flex items-center gap-3">
            <AvatarPreview avatar={avatar} size={56} />
            <div className="flex-1 min-w-0">
              <p className="font-pixel text-[10px] uppercase text-sunrise-400">Hero</p>
              <p className="text-sm font-bold truncate">{avatar.name}</p>
              <p className="text-[10px] text-parchment-100/80">
                Correct: {state.challengesCorrect}/{state.challengesAnswered || 0}
              </p>
            </div>
          </div>

          <div className="panel-pixel-dark p-3 flex items-center justify-center">
            <Dice
              value={state.diceValue}
              rolling={state.status === 'rolling'}
              disabled={!canRoll}
              onRoll={actions.rollDice}
              label={canRoll ? 'Roll the dice' : 'Wait for your turn'}
            />
          </div>

          <MiniMap position={state.position} />

          <div className="panel-pixel-dark p-3 text-[11px] leading-snug text-parchment-100">
            <p className="font-pixel text-[10px] uppercase text-sunrise-400 mb-1">
              How to play
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Tap the dice to roll a number.</li>
              <li>Your hero walks that many steps.</li>
              <li>If you land on a challenge tile, answer the question.</li>
              <li>Reach the castle to save the princess!</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn-pixel bg-parchment-200 text-forest-700 flex-1 !text-[10px]"
              onClick={() => navigate('/select')}
            >
              ◂ Change hero
            </button>
            <button
              type="button"
              className="btn-pixel bg-crimson-500 text-white flex-1 !text-[10px]"
              onClick={() => {
                if (window.confirm('Restart the adventure?')) {
                  actions.reset(avatarId);
                }
              }}
            >
              ⟲ Restart
            </button>
          </div>
        </aside>
      </main>

      <DialogBox
        open={showIntro}
        lines={INTRO_DIALOG}
        onClose={() => setShowIntro(false)}
      />

      <ChallengeModal
        open={challengeOpen}
        challenge={state.currentChallenge}
        lastAnswerCorrect={state.lastAnswerCorrect}
        outcome={state.pendingOutcome}
        feedbackMode={state.status === 'feedback'}
        onAnswer={actions.answerChallenge}
        onContinue={actions.closeChallenge}
      />
    </div>
  );
};
