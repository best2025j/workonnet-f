/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  daisyui: {
    themes: ['light'],
  },
  options: {
    safelist: ['bg-clip-text', 'text-transparent', 'bg-gradient-to-r', 'from-purple-400', 'via-pink-500', 'to-red-500'],
  },

  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(284.94deg, #B7680C 1.22%, #FE8900 100%)',
      },
      colors: {
        gray: {
          1: '#F9F5FF',
        },
        black: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#000000',
        },
        success: {
          50: '#effef7',
          100: '#dafeef',
          200: '#b8fadd',
          300: '#81f4c3',
          400: '#43e5a0',
          500: '#1acd81',
          600: '#0fa968',
          700: '#108554',
          800: '#126945',
          900: '#11563a',
          950: '#03301f',
        },
        warning: {
          50: '#f8ffe6',
          100: '#ebffbd',
          200: '#dcff7e',
          300: '#d1ff35',
          400: '#d4ff00',
          500: '#efff00',
          600: '#ded700',
          700: '#b19d00',
          800: '#917b02',
          900: '#755e08',
          950: '#483600',
        },
        danger: {
          50: '#fff0f1',
          100: '#ffdee0',
          200: '#ffc3c6',
          300: '#ff999e',
          400: '#ff5e65',
          500: '#ff2c36',
          600: '#f60c17',
          700: '#cf060f',
          800: '#ab0910',
          900: '#7a0d12',
          950: '#4d0205',
        },
        info: {
          50: '#eaf8ff',
          100: '#d1efff',
          200: '#ade3ff',
          300: '#74d5ff',
          400: '#33baff',
          500: '#0495ff',
          600: '#006eff',
          700: '#0055ff',
          800: '#0046d9',
          900: '#0041aa',
          950: '#062e76',
        },
        primary: {
          1: '#FE8900',
          2: '#B7680C',
          3: '#CC7D1E',
          4: '#E59A47',
          5: '#F3B05F',
          6: '#F8B974',
          7: '#FBC98E',
          8: '#FBD0A3',
        },
        westside: {
          50: '#fffbec',
          100: '#fff6d3',
          200: '#ffe9a5',
          300: '#ffd76d',
          400: '#ffb932',
          500: '#ffa10a',
          600: '#fe8900',
          700: '#cc6502',
          800: '#a14e0b',
          900: '#82410c',
          950: '#461f04',
        },
      },

      spacing: {
        3.5: '14px',
        4.5: '18px',
        13: '52px',
        22: '88px',
        19: '76px',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        5: '5px',
        8: '8px',
        10: '10px',
        12: '12px',
        20: '100px',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [require('daisyui')],
};
