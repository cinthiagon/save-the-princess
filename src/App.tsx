/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 * © 2026 Cinthia Gonçalez — project developed as a teaching resource for the
 * English subject taught by Teacher Angela Muniz for elementary school students.
 */
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@/routes/Home';
import { NotFound } from '@/routes/NotFound';

const AvatarSelect = lazy(() =>
  import('@/routes/AvatarSelect').then((m) => ({ default: m.AvatarSelect })),
);
const Game = lazy(() =>
  import('@/routes/Game').then((m) => ({ default: m.Game })),
);
const Victory = lazy(() =>
  import('@/routes/Victory').then((m) => ({ default: m.Victory })),
);
const GameOver = lazy(() =>
  import('@/routes/GameOver').then((m) => ({ default: m.GameOver })),
);
const Leaderboard = lazy(() =>
  import('@/routes/Leaderboard').then((m) => ({ default: m.Leaderboard })),
);
const Credits = lazy(() =>
  import('@/routes/Credits').then((m) => ({ default: m.Credits })),
);

const Loader = () => (
  <div className="min-h-screen grid place-items-center text-parchment-50">
    <div className="font-pixel text-xs animate-pulse-soft">Loading…</div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<AvatarSelect />} />
        <Route path="/play" element={<Game />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
