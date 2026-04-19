import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0B0B0D',
        surface: '#141417',
        'surface-raised': '#1A1A1E',
        border: 'rgba(255, 255, 255, 0.06)',
        'border-strong': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#F4F4F5',
        'text-secondary': '#A1A1AA',
        'text-muted': '#71717A',
        accent: '#FF4D1C',
        success: '#4ADE80',
        warning: '#FACC15',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'display': '-0.02em',
        'label': '0.08em',
      },
      boxShadow: {
        'accent-glow': '0 0 24px 0 rgba(255, 77, 28, 0.3)',
        'accent-glow-hover': '0 0 36px 4px rgba(255, 77, 28, 0.45)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
