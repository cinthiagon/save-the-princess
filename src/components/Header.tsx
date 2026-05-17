/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  compact?: boolean;
  onToggleSound?: () => void;
  soundOn?: boolean;
}

export const Header = ({ compact, onToggleSound, soundOn }: HeaderProps) => {
  return (
    <header className="px-3 sm:px-5 pt-3 sm:pt-4 flex items-center justify-between gap-3">
      <NavLink
        to="/"
        className="flex items-center gap-2 group"
        aria-label="Save the Princess — Home"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-sunrise-400 to-crimson-500 border-2 border-black/40 shadow-pixel-sm grid place-items-center">
          <span className="font-pixel text-[10px] text-parchment-50">SP</span>
        </div>
        <div className="leading-tight">
          <p className="font-pixel text-[10px] sm:text-xs text-parchment-100">Save the</p>
          <p className="font-pixel text-sm sm:text-base text-parchment-50">Princess</p>
        </div>
      </NavLink>

      {!compact && (
        <nav className="hidden sm:flex items-center gap-1">
          {[
            { to: '/play', label: 'Play' },
            { to: '/leaderboard', label: 'Leaderboard' },
            { to: '/credits', label: 'Credits' },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-xs font-pixel border-2 border-transparent transition ${
                  isActive
                    ? 'bg-parchment-100 text-forest-700 border-black/30 shadow-pixel-sm'
                    : 'text-parchment-50/90 hover:bg-white/10'
                }`
              }
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}

      {onToggleSound && (
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
          aria-pressed={!!soundOn}
          className="btn-pixel bg-parchment-100 text-forest-700 hover:bg-parchment-50 !px-3 !py-2 !text-[10px]"
        >
          {soundOn ? '🔊 Sound' : '🔈 Mute'}
        </button>
      )}
    </header>
  );
};
