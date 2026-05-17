/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TIPS } from '@/data/dialogs';
import { useSettings } from '@/hooks/useSettings';

export const Home = () => {
  const { settings, update } = useSettings();
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 px-4 py-6 sm:py-10 flex flex-col items-center justify-center gap-6 text-center max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 130, damping: 14 }}
        >
          <h1 className="font-pixel text-2xl sm:text-4xl text-parchment-50 drop-shadow-lg">
            Save the Princess
          </h1>
          <p className="mt-2 sm:mt-3 text-parchment-100/90 text-sm sm:text-base">
            A pixel-art adventure to learn English directions and past-tense
            structures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          <div className="panel-pixel p-4 text-left">
            <p className="font-pixel text-[10px] text-forest-500">Goal</p>
            <p className="text-sm font-bold text-forest-700">Reach the castle</p>
            <p className="text-xs text-forest-700/80 mt-1">Walk the path, roll the dice and rescue the princess.</p>
          </div>
          <div className="panel-pixel p-4 text-left">
            <p className="font-pixel text-[10px] text-forest-500">Learn</p>
            <p className="text-sm font-bold text-forest-700">Directions & past</p>
            <p className="text-xs text-forest-700/80 mt-1">Turn right, turn left, between, next to, there was, there were.</p>
          </div>
          <div className="panel-pixel p-4 text-left">
            <p className="font-pixel text-[10px] text-forest-500">Style</p>
            <p className="text-sm font-bold text-forest-700">Pixel-art RPG</p>
            <p className="text-xs text-forest-700/80 mt-1">Friendly visuals designed for elementary students.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-md">
          <Link
            to="/select"
            className="btn-pixel bg-sunrise-500 hover:bg-sunrise-400 text-white flex-1 text-center"
          >
            Start adventure
          </Link>
          <Link
            to="/leaderboard"
            className="btn-pixel bg-parchment-100 hover:bg-parchment-50 text-forest-700 flex-1 text-center"
          >
            Leaderboard
          </Link>
        </div>

        <div className="panel-pixel-dark p-4 w-full max-w-2xl mt-4 text-left">
          <p className="font-pixel text-[10px] text-sunrise-400 uppercase mb-1">
            Quick tips
          </p>
          <ul className="grid sm:grid-cols-2 gap-1 text-xs text-parchment-100">
            {TIPS.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-sunrise-400">✦</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};
