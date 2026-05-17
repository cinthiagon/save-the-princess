/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { useCallback, useEffect, useState } from 'react';
import { storage, STORAGE_KEYS } from '@/services/storage';
import type { Settings } from '@/types/game';
import { audio } from '@/services/audio';

const DEFAULT_SETTINGS: Settings = {
  soundOn: true,
  musicOn: false,
  highContrast: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() =>
    storage.get<Settings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
  );

  useEffect(() => {
    storage.set(STORAGE_KEYS.settings, settings);
    audio.setEnabled(settings.soundOn);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle(
        'contrast-more',
        settings.highContrast,
      );
    }
  }, [settings]);

  const update = useCallback((partial: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...partial }));
  }, []);

  return { settings, update };
};
