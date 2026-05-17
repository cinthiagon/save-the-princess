/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Nickname validation. The leaderboard is intentionally restricted so we
 * cannot collect personal information and so children cannot enter
 * inappropriate content. We block bad words in English and Portuguese
 * (and a few common leet variations), block URLs, emails and phones,
 * and only allow letters + a single hyphen.
 */

/** Reasonable max length for in-game labels. */
export const MAX_NICKNAME_LENGTH = 15;

/**
 * Friendly message displayed when validation fails. Kept in English to
 * be consistent with the rest of the game.
 */
export const NICKNAME_ERROR_MESSAGE =
  'Please choose a friendly nickname with letters only.';

/**
 * Privacy reminder displayed near the nickname input.
 */
export const PRIVACY_MESSAGE =
  'This game does not collect personal information. Please use only your first name or a nickname for the leaderboard.';

/**
 * Word-list of slurs and profanities to block. This list is intentionally
 * conservative — the regex below also catches common letter↔number
 * substitutions. We block both English and Portuguese terms.
 */
const BLOCK_LIST: string[] = [
  // English
  'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'pussy', 'cunt',
  'slut', 'whore', 'cock', 'fag', 'nigger', 'nigga', 'retard', 'damn',
  'douche', 'piss', 'crap',
  // Portuguese
  'merda', 'porra', 'caralho', 'puta', 'cu', 'cuzao', 'cuzão', 'piranha',
  'corno', 'viado', 'viadinho', 'bicha', 'arrombado', 'desgracado',
  'desgraçado', 'foda', 'fdp', 'fodase', 'foder', 'buceta', 'pinto',
  'pau', 'pinta', 'safado', 'idiota', 'imbecil', 'burro', 'otario',
  'otário',
];

/** Quick patterns for emails / URLs / phone numbers. */
const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/i;
const URL_RE = /(?:https?:\/\/|www\.|\.[a-z]{2,})/i;
const PHONE_RE = /(?:\+?\d[\d\s\-()]{6,})/;

/** Common letter↔number/leetspeak substitutions used to bypass filters. */
const LEET_MAP: Record<string, string> = {
  '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b',
  '@': 'a', '$': 's', '!': 'i',
};

const normalizeForBlocklist = (raw: string): string => {
  const lower = raw.toLowerCase();
  const stripped = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let out = '';
  for (const ch of stripped) {
    out += LEET_MAP[ch] ?? ch;
  }
  return out.replace(/[^a-z]/g, '');
};

export interface NicknameValidation {
  ok: boolean;
  value: string;
  error?: string;
}

/**
 * Trim, collapse spaces, and validate the nickname. We only allow
 * letters (including accented), and a single internal hyphen.
 */
export const validateNickname = (input: string): NicknameValidation => {
  const trimmed = input.trim().replace(/\s+/g, ' ');

  if (!trimmed) {
    return { ok: false, value: '', error: NICKNAME_ERROR_MESSAGE };
  }

  if (trimmed.length > MAX_NICKNAME_LENGTH) {
    return { ok: false, value: trimmed, error: NICKNAME_ERROR_MESSAGE };
  }

  if (EMAIL_RE.test(trimmed) || URL_RE.test(trimmed) || PHONE_RE.test(trimmed)) {
    return { ok: false, value: trimmed, error: NICKNAME_ERROR_MESSAGE };
  }

  // Only letters (including accented), spaces and a single hyphen.
  const allowed = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ]+)?$/;
  if (!allowed.test(trimmed)) {
    return { ok: false, value: trimmed, error: NICKNAME_ERROR_MESSAGE };
  }

  const normalized = normalizeForBlocklist(trimmed);
  for (const bad of BLOCK_LIST) {
    if (normalized.includes(bad)) {
      return { ok: false, value: trimmed, error: NICKNAME_ERROR_MESSAGE };
    }
  }

  // Capitalize first letter for a friendly look.
  const display =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  return { ok: true, value: display };
};
