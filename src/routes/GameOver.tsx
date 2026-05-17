/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSettings } from '@/hooks/useSettings';
import { storage, STORAGE_KEYS } from '@/services/storage';
import { useEffect } from 'react';

export const GameOver = () => {
  const { settings, update } = useSettings();
  useEffect(() => {
    storage.remove(STORAGE_KEYS.progress);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 grid place-items-center px-4">
        <div className="panel-pixel p-6 text-center max-w-md">
          <h1 className="font-pixel text-xl text-crimson-600 mb-2">Try again!</h1>
          <p className="text-forest-700 text-sm">
            The princess still needs your help. Take a deep breath and try the
            quest one more time.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <Link to="/select" className="btn-pixel bg-sunrise-500 text-white">
              Play again
            </Link>
            <Link to="/" className="btn-pixel bg-parchment-200 text-forest-700">
              Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
