/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSettings } from '@/hooks/useSettings';

export const Credits = () => {
  const { settings, update } = useSettings();
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        soundOn={settings.soundOn}
        onToggleSound={() => update({ soundOn: !settings.soundOn })}
      />
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="panel-pixel p-6 text-center space-y-3 text-forest-700">
          <h1 className="font-pixel text-xl sm:text-2xl">Credits</h1>
          <p className="font-bold">
            © 2026 Cinthia Gonçalez — project developed as a teaching resource for the
            English subject taught by Teacher Angela Muniz for elementary school students.
          </p>

          <div className="text-left text-sm text-forest-700/90 leading-relaxed space-y-2 pt-2">
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Game design & development
              </span>
              Cinthia Gonçalez
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Pedagogical guidance
              </span>
              Teacher Angela Muniz — English subject
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Original pixel art
              </span>
              All sprites, tiles and UI are 100% original artwork generated
              procedurally inside the project. No third-party copyrighted
              assets are used.
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Sound
              </span>
              Friendly UI sound effects are synthesised live with the Web Audio
              API — no audio files are bundled or downloaded.
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Open-source tools
              </span>
              React, Vite, TypeScript, TailwindCSS, Framer Motion, React Router
              and Phaser — all distributed under permissive open-source
              licenses (MIT / Apache).
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Fonts
              </span>
              "Press Start 2P" and "Nunito" via Google Fonts (free for any use).
            </p>
            <p>
              <span className="font-pixel text-[10px] uppercase text-forest-500 block">
                Privacy
              </span>
              This game does not collect personal information. Only a nickname
              and game stats are stored locally on the player&apos;s own
              browser. No backend, no tracking, no ads.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
