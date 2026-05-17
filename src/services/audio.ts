/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 *
 * Tiny WebAudio synth used to play short, friendly UI sounds (dice
 * roll, correct answer, wrong answer, victory). We avoid bundling any
 * external audio file so the game is 100% free of third-party assets
 * and stays well under any free-tier hosting budget.
 */
type SoundName =
  | 'roll'
  | 'step'
  | 'correct'
  | 'wrong'
  | 'select'
  | 'victory'
  | 'fanfare';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private enabled = true;

  setEnabled(value: boolean) {
    this.enabled = value;
    if (this.master) this.master.gain.value = value ? 0.25 : 0;
  }

  private ensure(): AudioContext | null {
    if (!this.enabled) return null;
    if (typeof window === 'undefined') return null;
    if (this.ctx) return this.ctx;
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.25;
      this.master.connect(this.ctx.destination);
      return this.ctx;
    } catch {
      return null;
    }
  }

  private blip(freq: number, duration = 0.15, type: OscillatorType = 'square', delay = 0): void {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    osc.connect(gain).connect(this.master);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.02);
  }

  play(name: SoundName): void {
    if (!this.enabled) return;
    switch (name) {
      case 'roll':
        for (let i = 0; i < 5; i++) {
          this.blip(220 + i * 60, 0.05, 'square', i * 0.06);
        }
        break;
      case 'step':
        this.blip(520, 0.06, 'triangle');
        break;
      case 'select':
        this.blip(660, 0.08, 'triangle');
        break;
      case 'correct':
        this.blip(523.25, 0.12, 'triangle', 0);
        this.blip(659.25, 0.12, 'triangle', 0.1);
        this.blip(783.99, 0.18, 'triangle', 0.2);
        break;
      case 'wrong':
        this.blip(220, 0.18, 'sawtooth', 0);
        this.blip(174.61, 0.22, 'sawtooth', 0.16);
        break;
      case 'victory':
        this.blip(523.25, 0.14, 'square', 0);
        this.blip(659.25, 0.14, 'square', 0.14);
        this.blip(783.99, 0.14, 'square', 0.28);
        this.blip(1046.5, 0.28, 'square', 0.42);
        break;
      case 'fanfare':
        this.blip(392, 0.16, 'square', 0);
        this.blip(523.25, 0.16, 'square', 0.16);
        this.blip(659.25, 0.16, 'square', 0.32);
        this.blip(880, 0.32, 'square', 0.48);
        break;
    }
  }
}

export const audio = new AudioEngine();
