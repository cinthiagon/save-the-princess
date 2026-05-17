/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Local-only leaderboard. The structure mirrors what a future Firebase
 * implementation would need, so it is safe to swap the storage layer
 * without rewriting the UI.
 */
import { storage, STORAGE_KEYS } from './storage';
import type { LeaderboardEntry } from '@/types/game';

const MAX_ENTRIES = 25;

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const leaderboardService = {
  list(): LeaderboardEntry[] {
    return storage
      .get<LeaderboardEntry[]>(STORAGE_KEYS.leaderboard, [])
      .slice()
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.stars !== a.stars) return b.stars - a.stars;
        return a.timeSeconds - b.timeSeconds;
      });
  },

  add(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
    const full: LeaderboardEntry = {
      ...entry,
      id: generateId(),
      date: new Date().toISOString(),
    };

    const existing = storage.get<LeaderboardEntry[]>(
      STORAGE_KEYS.leaderboard,
      [],
    );
    const next = [...existing, full]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.stars !== a.stars) return b.stars - a.stars;
        return a.timeSeconds - b.timeSeconds;
      })
      .slice(0, MAX_ENTRIES);

    storage.set(STORAGE_KEYS.leaderboard, next);
    return full;
  },

  clear(): void {
    storage.remove(STORAGE_KEYS.leaderboard);
  },
};
