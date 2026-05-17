/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AvatarPreview } from '@/components/AvatarPreview';
import { AVATARS } from '@/data/avatars';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { useState } from 'react';
import { audio } from '@/services/audio';
import type { AvatarId } from '@/types/game';
import { useSettings } from '@/hooks/useSettings';

export const AvatarSelect = () => {
  const navigate = useNavigate();
  const { settings, update } = useSettings();
  const [selected, setSelected] = useState<AvatarId>(
    storage.get<AvatarId>(STORAGE_KEYS.lastAvatar, 'aria'),
  );

  const confirm = () => {
    storage.set(STORAGE_KEYS.lastAvatar, selected);
    // Reset previous progress so the player starts fresh with the new hero.
    storage.remove(STORAGE_KEYS.progress);
    audio.play('select');
    navigate('/play');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 px-4 py-6 sm:py-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-pixel text-xl sm:text-2xl text-parchment-50">
            Choose your hero
          </h1>
          <p className="mt-1 text-parchment-100/90 text-sm">
            Pick the explorer who will rescue the princess.
          </p>
        </motion.div>

        <div
          role="radiogroup"
          aria-label="Hero selection"
          className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {AVATARS.map((avatar) => {
            const isSel = avatar.id === selected;
            return (
              <button
                key={avatar.id}
                type="button"
                role="radio"
                aria-checked={isSel}
                onClick={() => {
                  setSelected(avatar.id);
                  audio.play('select');
                }}
                className={`panel-pixel p-3 sm:p-4 flex flex-col items-center gap-2 transition transform ${
                  isSel
                    ? 'ring-4 ring-sunrise-400 scale-[1.02]'
                    : 'hover:scale-[1.01]'
                }`}
              >
                <AvatarPreview avatar={avatar} size={96} />
                <p className="font-pixel text-[10px] uppercase text-forest-500">
                  Hero
                </p>
                <p className="text-sm font-bold text-forest-700">{avatar.name}</p>
                <p className="text-[11px] text-forest-700/80 text-center leading-snug">
                  {avatar.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-pixel bg-parchment-200 text-forest-700"
          >
            ◂ Back
          </button>
          <button
            type="button"
            onClick={confirm}
            className="btn-pixel bg-sunrise-500 hover:bg-sunrise-400 text-white"
          >
            Start the journey ▸
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] text-parchment-100/70">
          All heroes are original, friendly characters drawn in pixel art.
          They share the same powers and the same spotlight.
        </p>
      </main>
      <Footer />
    </div>
  );
};
