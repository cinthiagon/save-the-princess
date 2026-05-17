/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { motion } from 'framer-motion';

interface HudProps {
  score: number;
  stars: number;
  coins: number;
  lives: number;
  level: number;
  progress: number; // 0..1
  streak: number;
}

const Stat = ({
  label, value, icon, srLabel,
}: { label: string; value: number | string; icon: React.ReactNode; srLabel: string }) => (
  <div
    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-black/35 border border-white/15 text-parchment-50"
    aria-label={srLabel}
  >
    <span aria-hidden="true">{icon}</span>
    <span className="font-pixel text-[10px] sm:text-xs">{value}</span>
    <span className="sr-only">{label}</span>
  </div>
);

const Heart = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M12 21s-7-4.5-9.5-9C.7 9 2.3 5 6 5c2 0 3.5 1 4.5 2.5L12 9l1.5-1.5C14.5 6 16 5 18 5c3.7 0 5.3 4 3.5 7C19 16.5 12 21 12 21Z"
      fill={filled ? '#d8425a' : 'rgba(255,255,255,0.25)'}
      stroke="#1a1a1a"
      strokeWidth="1.5"
    />
  </svg>
);

const Star = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M12 2.5 14.9 9l7 .6-5.3 4.7L18.2 21 12 17.3 5.8 21l1.6-6.7L2.1 9.6l7-.6L12 2.5Z"
      fill={filled ? '#ffc371' : 'rgba(255,255,255,0.25)'}
      stroke="#1a1a1a"
      strokeWidth="1.2"
    />
  </svg>
);

export const HUD = ({ score, stars, coins, lives, level, progress, streak }: HudProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-wrap items-center gap-2">
        <Stat
          label="Score"
          srLabel={`Score: ${score}`}
          value={score.toLocaleString('en-US')}
          icon={<span style={{ color: '#ffc371' }}>★</span>}
        />
        <Stat
          label="Coins"
          srLabel={`Coins: ${coins}`}
          value={coins}
          icon={<span style={{ color: '#ffd066' }}>◎</span>}
        />
        <Stat
          label="Level"
          srLabel={`Level: ${level}`}
          value={`Lv ${level}`}
          icon={<span style={{ color: '#a5d8f0' }}>✦</span>}
        />
        {streak > 0 && (
          <Stat
            label="Streak"
            srLabel={`Streak: ${streak}`}
            value={`x${streak}`}
            icon={<span style={{ color: '#ff8a3d' }}>⚡</span>}
          />
        )}
        <div className="flex items-center gap-1" aria-label={`Lives left: ${lives}`}>
          {[0, 1, 2].map((i) => (
            <Heart key={i} filled={i < lives} />
          ))}
        </div>
        <div className="flex items-center gap-1" aria-label={`Stars: ${stars}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} filled={i < stars} />
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-pixel text-parchment-50/80 mb-1">
          <span>Journey</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div
          className="h-3 w-full rounded-full bg-black/40 border border-white/15 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(90deg, #5fa463, #ffc371, #d8425a)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
