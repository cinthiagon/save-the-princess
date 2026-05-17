/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AvatarPreview } from '@/components/AvatarPreview';
import { getAvatarById } from '@/data/avatars';
import { leaderboardService } from '@/services/leaderboard';
import { useSettings } from '@/hooks/useSettings';
import { PRIVACY_MESSAGE } from '@/services/nickname';

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso.slice(0, 10);
  }
};

export const Leaderboard = () => {
  const { settings, update } = useSettings();
  const [version, setVersion] = useState(0);
  const entries = useMemo(() => leaderboardService.list(), [version]);

  const clear = () => {
    if (window.confirm('Clear the local leaderboard? This cannot be undone.')) {
      leaderboardService.clear();
      setVersion((v) => v + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h1 className="font-pixel text-xl sm:text-2xl text-parchment-50">
            Leaderboard
          </h1>
          <Link to="/select" className="btn-pixel bg-sunrise-500 text-white !text-[10px]">
            Play
          </Link>
        </div>

        <p className="text-[11px] text-parchment-100/80 mb-3">{PRIVACY_MESSAGE}</p>

        {entries.length === 0 ? (
          <div className="panel-pixel p-6 text-center">
            <p className="font-bold text-forest-700">No heroes yet!</p>
            <p className="text-sm text-forest-700/80">
              Be the first to save the princess and add your name.
            </p>
            <Link
              to="/select"
              className="btn-pixel bg-forest-500 text-white inline-block mt-3"
            >
              Start adventure
            </Link>
          </div>
        ) : (
          <div className="panel-pixel overflow-hidden">
            <ol className="divide-y divide-forest-700/15">
              {entries.map((e, i) => {
                const avatar = getAvatarById(e.avatarId);
                const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
                return (
                  <li
                    key={e.id}
                    className="flex items-center gap-3 p-3 sm:p-4 text-forest-700"
                  >
                    <div className="w-8 sm:w-10 text-center font-pixel text-sm">
                      {medal ?? `${i + 1}`}
                    </div>
                    <AvatarPreview avatar={avatar} size={48} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{e.name}</p>
                      <p className="text-xs text-forest-700/70">
                        {formatDate(e.date)} • {formatTime(e.timeSeconds)} • {e.stars}/5 ★
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-pixel text-xs">Score</p>
                      <p className="font-extrabold text-lg leading-tight">
                        {e.score.toLocaleString('en-US')}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {entries.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={clear}
              className="btn-pixel bg-parchment-200 text-forest-700 !text-[10px]"
            >
              Clear leaderboard
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
