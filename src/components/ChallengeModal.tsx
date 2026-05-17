/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { AnimatePresence, motion } from 'framer-motion';
import type { Challenge } from '@/types/game';
import type { ChallengeOutcome } from '@/hooks/useGameState';

interface ChallengeModalProps {
  open: boolean;
  challenge: Challenge | null;
  lastAnswerCorrect: boolean | null;
  /** Movement consequence (advance / retreat / stay) for the feedback. */
  outcome: ChallengeOutcome | null;
  /** Disable buttons until the user closes the feedback. */
  feedbackMode: boolean;
  onAnswer: (optionId: string) => void;
  onContinue: () => void;
}

const categoryLabel: Record<Challenge['category'], string> = {
  directions: 'Directions',
  location: 'Location',
  past: 'Past tense — there was / there were',
};

export const ChallengeModal = ({
  open, challenge, lastAnswerCorrect, outcome, feedbackMode,
  onAnswer, onContinue,
}: ChallengeModalProps) => {
  return (
    <AnimatePresence>
      {open && challenge && (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-3"
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-title"
        >
          <motion.div
            initial={{ y: 20, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="panel-pixel w-full max-w-lg p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="chip uppercase tracking-wide">
                {categoryLabel[challenge.category]}
              </span>
              <span className="font-pixel text-[10px] text-forest-700/80">
                English challenge
              </span>
            </div>

            <h2
              id="challenge-title"
              className="text-lg sm:text-xl font-extrabold leading-snug text-forest-700 mb-3"
            >
              {challenge.prompt}
            </h2>

            {challenge.hint && (
              <p className="text-xs sm:text-sm italic text-forest-700/70 mb-3">
                Hint: {challenge.hint}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {challenge.options.map((opt) => {
                const isCorrect = opt.id === challenge.correctId;
                const showCorrect = feedbackMode && isCorrect;
                const showWrong =
                  feedbackMode && lastAnswerCorrect === false && !isCorrect;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => !feedbackMode && onAnswer(opt.id)}
                    disabled={feedbackMode}
                    className={`btn-pixel text-left text-[11px] sm:text-xs ${
                      showCorrect
                        ? 'bg-forest-500 text-parchment-50'
                        : showWrong
                          ? 'bg-crimson-500 text-parchment-50 opacity-80'
                          : 'bg-parchment-100 text-forest-700 hover:bg-parchment-50'
                    }`}
                    aria-pressed={feedbackMode && showCorrect}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {feedbackMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 rounded-lg border-2 p-3 text-sm ${
                    lastAnswerCorrect
                      ? 'bg-forest-500/15 border-forest-500 text-forest-700'
                      : 'bg-crimson-500/15 border-crimson-500 text-crimson-600'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-bold">
                    {lastAnswerCorrect ? 'Great job!' : 'Not quite — keep going!'}
                  </p>
                  <p className="mt-1 text-forest-700/90">{challenge.explanation}</p>
                  {outcome && outcome.type !== 'stay' && (
                    <p
                      className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 font-pixel text-[10px] uppercase ${
                        outcome.type === 'advance'
                          ? 'bg-forest-500 text-parchment-50'
                          : 'bg-crimson-500 text-parchment-50'
                      }`}
                    >
                      <span aria-hidden="true">
                        {outcome.type === 'advance' ? '▶' : '◀'}
                      </span>
                      {outcome.label}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {feedbackMode && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="btn-pixel bg-royal-500 text-parchment-50 hover:bg-royal-400"
                  onClick={onContinue}
                >
                  Continue
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
