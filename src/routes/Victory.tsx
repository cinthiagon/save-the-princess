/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AvatarPreview } from '@/components/AvatarPreview';
import { getAvatarById } from '@/data/avatars';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { leaderboardService } from '@/services/leaderboard';
import {
  MAX_NICKNAME_LENGTH,
  NICKNAME_ERROR_MESSAGE,
  PRIVACY_MESSAGE,
  validateNickname,
} from '@/services/nickname';
import { audio } from '@/services/audio';
import { VICTORY_DIALOG } from '@/data/dialogs';
import { useSettings } from '@/hooks/useSettings';
import type { AvatarId } from '@/types/game';

interface VictorySummary {
  avatarId: AvatarId;
  name: string;
  score: number;
  stars: number;
  coins: number;
  challengesAnswered: number;
  challengesCorrect: number;
  timeSeconds: number;
}

export const Victory = () => {
  const navigate = useNavigate();
  const { settings, update } = useSettings();
  const summary = storage.get<VictorySummary | null>('victory-summary', null);

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const avatar = useMemo(
    () => getAvatarById(summary?.avatarId ?? 'aria'),
    [summary?.avatarId],
  );

  useEffect(() => {
    if (!summary) {
      const t = window.setTimeout(() => navigate('/'), 600);
      return () => window.clearTimeout(t);
    }
    audio.play('fanfare');
    return undefined;
  }, [summary, navigate]);

  if (!summary) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateNickname(nickname);
    if (!result.ok) {
      setError(result.error ?? NICKNAME_ERROR_MESSAGE);
      return;
    }
    setError(null);
    leaderboardService.add({
      name: result.value,
      avatarId: summary.avatarId,
      score: summary.score,
      stars: summary.stars,
      timeSeconds: summary.timeSeconds,
    });
    storage.remove(STORAGE_KEYS.progress);
    setSaved(true);
  };

  const accuracy =
    summary.challengesAnswered > 0
      ? Math.round((summary.challengesCorrect / summary.challengesAnswered) * 100)
      : 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          className="panel-pixel p-6 text-center"
        >
          <p className="font-pixel text-[10px] text-forest-500 uppercase">Adventure complete</p>
          <h1 className="font-pixel text-2xl sm:text-3xl text-forest-700 mt-1">
            You saved the princess!
          </h1>
          <div className="mt-3 flex justify-center">
            <AvatarPreview avatar={avatar} size={120} />
          </div>
          <div className="mt-3 text-left sm:text-center text-sm text-forest-700/90 space-y-1">
            {VICTORY_DIALOG.map((d) => (
              <p key={d.text}>
                <span className="font-bold text-crimson-500">{d.speaker}:</span>{' '}
                {d.text}
              </p>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Stat label="Score" value={summary.score.toLocaleString('en-US')} />
            <Stat label="Stars" value={`${summary.stars}/5`} />
            <Stat label="Accuracy" value={`${accuracy}%`} />
            <Stat label="Time" value={formatTime(summary.timeSeconds)} />
          </div>

          {!saved ? (
            <form onSubmit={submit} className="mt-6 text-left">
              <label
                htmlFor="nickname"
                className="font-pixel text-[10px] uppercase text-forest-500"
              >
                Your nickname for the leaderboard
              </label>
              <input
                id="nickname"
                type="text"
                inputMode="text"
                autoComplete="nickname"
                maxLength={MAX_NICKNAME_LENGTH}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Aria"
                className="mt-1 w-full rounded-md border-2 border-forest-700/40 bg-parchment-50 px-3 py-2 text-base text-forest-700 focus:outline-none focus:ring-2 focus:ring-sunrise-400"
                aria-describedby="privacy-note"
              />
              <p id="privacy-note" className="mt-2 text-[11px] text-forest-700/80">
                {PRIVACY_MESSAGE}
              </p>
              {error && (
                <p className="mt-2 text-sm font-bold text-crimson-600" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="btn-pixel bg-sunrise-500 text-white flex-1"
                >
                  Save to leaderboard
                </button>
                <button
                  type="button"
                  className="btn-pixel bg-parchment-200 text-forest-700 flex-1"
                  onClick={() => navigate('/leaderboard')}
                >
                  Skip
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 text-center">
              <p className="text-forest-700 font-bold">Saved to the leaderboard!</p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <Link to="/leaderboard" className="btn-pixel bg-royal-500 text-white">
                  View leaderboard
                </Link>
                <Link to="/select" className="btn-pixel bg-forest-500 text-white">
                  Play again
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border-2 border-forest-700/20 bg-parchment-50 p-3">
    <p className="font-pixel text-[10px] uppercase text-forest-500">{label}</p>
    <p className="text-lg font-extrabold text-forest-700">{value}</p>
  </div>
);

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};
