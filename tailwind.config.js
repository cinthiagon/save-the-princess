/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: {
          50: '#fbf5e1',
          100: '#f4e7b6',
          200: '#ead38a',
        },
        forest: {
          400: '#5fa463',
          500: '#3f7d4a',
          600: '#2c5d36',
          700: '#1f4527',
        },
        royal: {
          400: '#7a6cf0',
          500: '#5c4ddc',
          600: '#4338b8',
          700: '#2f2891',
        },
        sunrise: {
          400: '#ffc371',
          500: '#ff8a3d',
          600: '#e76a1e',
        },
        crimson: {
          500: '#d8425a',
          600: '#b22c43',
        },
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.35)',
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.4)',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        bob: 'bob 1.8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 1.6s ease-in-out infinite',
        wiggle: 'wiggle 1.2s ease-in-out infinite',
      },
      backgroundImage: {
        'paper-noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.86  0 0 0 0 0.55  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
