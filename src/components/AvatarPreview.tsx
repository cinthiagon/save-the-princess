/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { useEffect, useRef } from 'react';
import type { Avatar } from '@/types/game';
import { buildAvatarPreview } from '@/game/sprites';

interface AvatarPreviewProps {
  avatar: Avatar;
  size?: number;
  className?: string;
}

export const AvatarPreview = ({ avatar, size = 96, className }: AvatarPreviewProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const scale = Math.max(2, Math.floor(size / 16));
    const src = buildAvatarPreview(avatar, scale);
    target.width = src.width;
    target.height = src.height;
    const ctx = target.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, target.width, target.height);
    ctx.drawImage(src, 0, 0);
  }, [avatar, size]);

  return (
    <canvas
      ref={ref}
      className={`pixel-img ${className ?? ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
};
