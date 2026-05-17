/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Tiny LocalStorage helper with safe JSON serialization. We never store
 * personal data — only nickname (first name or alias), avatar choice
 * and game progress.
 */
const PREFIX = 'stp:'; // save-the-princess

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!isBrowser) return fallback;
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // Quota exceeded or disabled — fail silently to avoid breaking the
      // game for the child.
    }
  },

  remove(key: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(PREFIX + key);
    } catch {
      /* noop */
    }
  },
};

export const STORAGE_KEYS = {
  settings: 'settings',
  lastAvatar: 'last-avatar',
  progress: 'progress',
  leaderboard: 'leaderboard',
  achievements: 'achievements',
} as const;
