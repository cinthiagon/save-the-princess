/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Animated digital die. Tap or press Space/Enter to roll.
 */
import { motion } from 'framer-motion';

interface DiceProps {
  value: number | null;
  rolling: boolean;
  disabled?: boolean;
  onRoll: () => void;
  label?: string;
}

const Pip = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="6" fill="#1f4527" />
);

const FACES: Record<number, Array<{ x: number; y: number }>> = {
  1: [{ x: 32, y: 32 }],
  2: [{ x: 16, y: 16 }, { x: 48, y: 48 }],
  3: [{ x: 16, y: 16 }, { x: 32, y: 32 }, { x: 48, y: 48 }],
  4: [{ x: 16, y: 16 }, { x: 48, y: 16 }, { x: 16, y: 48 }, { x: 48, y: 48 }],
  5: [{ x: 16, y: 16 }, { x: 48, y: 16 }, { x: 32, y: 32 }, { x: 16, y: 48 }, { x: 48, y: 48 }],
  6: [
    { x: 16, y: 14 }, { x: 48, y: 14 },
    { x: 16, y: 32 }, { x: 48, y: 32 },
    { x: 16, y: 50 }, { x: 48, y: 50 },
  ],
};

export const Dice = ({ value, rolling, disabled, onRoll, label }: DiceProps) => {
  const display = value ?? 1;
  return (
    <button
      type="button"
      onClick={onRoll}
      disabled={disabled || rolling}
      aria-label={label ?? 'Roll the dice'}
      className={`relative grid place-items-center select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-sunrise-400/70 rounded-2xl ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <motion.div
        animate={
          rolling
            ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.06, 0.96, 1.04, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={
          rolling
            ? { duration: 0.7, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 200, damping: 14 }
        }
        className="rounded-2xl shadow-pixel border-2 border-black/40"
        style={{
          background:
            'linear-gradient(135deg, #fbf5e1 0%, #f4e7b6 50%, #ead38a 100%)',
        }}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          aria-hidden="true"
        >
          {FACES[display].map((p, i) => (
            <Pip key={i} x={p.x} y={p.y} />
          ))}
        </svg>
      </motion.div>
      <span className="mt-2 font-pixel text-[10px] sm:text-xs uppercase text-parchment-50/90">
        {rolling ? 'Rolling…' : value ? `You rolled ${value}!` : 'Roll the dice'}
      </span>
    </button>
  );
};
