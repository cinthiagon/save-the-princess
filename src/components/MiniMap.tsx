/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { BOARD, BOARD_PATH } from '@/data/board';

interface MiniMapProps {
  position: number;
}

export const MiniMap = ({ position }: MiniMapProps) => {
  const W = 220;
  const H = 130;
  const sx = W / (BOARD.cols * BOARD.tileSize);
  const sy = H / (BOARD.rows * BOARD.tileSize);

  return (
    <div
      className="panel-pixel-dark p-2 select-none"
      aria-label="Mini map showing your journey"
    >
      <div className="font-pixel text-[10px] uppercase tracking-wider text-parchment-100 mb-1">
        Mini map
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-hidden="true">
        <rect width={W} height={H} rx={6} fill="#1f4527" />
        {/* Mountains border */}
        {BOARD.decorations
          .filter((d) => d.type === 'mountain')
          .map((d, i) => (
            <rect
              key={`m-${i}`}
              x={d.col * BOARD.tileSize * sx}
              y={d.row * BOARD.tileSize * sy}
              width={BOARD.tileSize * sx}
              height={BOARD.tileSize * sy}
              fill="#6f6f6f"
              opacity={0.55}
            />
          ))}
        {/* Forest blobs */}
        {BOARD.decorations
          .filter((d) => d.type === 'forest')
          .map((d, i) => (
            <rect
              key={`f-${i}`}
              x={d.col * BOARD.tileSize * sx}
              y={d.row * BOARD.tileSize * sy}
              width={BOARD.tileSize * sx}
              height={BOARD.tileSize * sy}
              fill="#3f7d4a"
              opacity={0.55}
            />
          ))}
        {/* Path */}
        <polyline
          points={BOARD_PATH.map(
            (p) =>
              `${(p.col + 0.5) * BOARD.tileSize * sx},${(p.row + 0.5) * BOARD.tileSize * sy}`,
          ).join(' ')}
          fill="none"
          stroke="#cdb27a"
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Landmarks */}
        {BOARD.tiles.map((t, i) => {
          const p = BOARD_PATH[i];
          if (!p) return null;
          const cx = (p.col + 0.5) * BOARD.tileSize * sx;
          const cy = (p.row + 0.5) * BOARD.tileSize * sy;
          if (t.type === 'castle-end') {
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={6} fill="#ffd066" stroke="#1a1a1a" strokeWidth={1} />
                <text x={cx} y={cy + 2} textAnchor="middle" fontSize={7} fill="#1a1a1a">C</text>
              </g>
            );
          }
          if (t.type === 'castle-start') {
            return <circle key={i} cx={cx} cy={cy} r={4} fill="#5fa463" stroke="#1a1a1a" strokeWidth={1} />;
          }
          if (t.type === 'bakery' || t.type === 'library' || t.type === 'market' || t.type === 'fountain' || t.type === 'village') {
            return <rect key={i} x={cx - 3} y={cy - 3} width={6} height={6} fill="#d8425a" stroke="#1a1a1a" strokeWidth={0.5} />;
          }
          if (t.type === 'bridge') {
            return <rect key={i} x={cx - 3} y={cy - 2} width={6} height={4} fill="#8a5a3b" stroke="#1a1a1a" strokeWidth={0.5} />;
          }
          if (t.challenge) {
            return <circle key={i} cx={cx} cy={cy} r={2.2} fill="#ffc371" />;
          }
          return null;
        })}
        {/* Player */}
        {(() => {
          const p = BOARD_PATH[Math.min(position, BOARD_PATH.length - 1)];
          if (!p) return null;
          const cx = (p.col + 0.5) * BOARD.tileSize * sx;
          const cy = (p.row + 0.5) * BOARD.tileSize * sy;
          return <circle cx={cx} cy={cy} r={5} fill="#d8425a" stroke="#fbf5e1" strokeWidth={1.5} />;
        })()}
      </svg>
    </div>
  );
};
