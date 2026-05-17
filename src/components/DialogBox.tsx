/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { DialogLine } from '@/data/dialogs';

interface DialogBoxProps {
  open: boolean;
  lines: DialogLine[];
  onClose: () => void;
}

export const DialogBox = ({ open, lines, onClose }: DialogBoxProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;
  const line = lines[step];
  const isLast = step === lines.length - 1;

  const next = () => {
    if (isLast) onClose();
    else setStep((s) => s + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 grid place-items-end sm:place-items-center bg-black/40 p-3 pb-6 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="panel-pixel w-full max-w-xl p-4"
        >
          <p className="font-pixel text-[10px] uppercase text-forest-500 mb-1">
            {line.speaker}
          </p>
          <p className="text-sm sm:text-base text-forest-700 leading-snug">
            {line.text}
          </p>
          <div className="mt-3 flex justify-end gap-2">
            {!isLast && (
              <button
                type="button"
                onClick={onClose}
                className="btn-pixel bg-parchment-200 text-forest-700 !text-[10px]"
              >
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="btn-pixel bg-forest-500 text-parchment-50 !text-[10px]"
              autoFocus
            >
              {isLast ? 'Let’s go!' : 'Next ▸'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
