/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        slideInRight: {
          '0%': { opacity: '0%', transform: 'translateX(100%)' },
          '100%': { opacity: '100%', transform: 'translateX(0%)'}
        }
      },
      animation: {
        'gradient': 'gradient 10s ease infinite',
        'slide-in-right': 'slideInRight 200ms ease',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
