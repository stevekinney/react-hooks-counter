/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ theme, addComponents }) => {
      const inputPadding = `${theme('spacing.2')} ${theme('spacing.4')}`;

      addComponents({
        button: {
          backgroundColor: theme('colors.pink.300'),
          borderColor: theme('colors.pink.400'),
          borderWidth: theme('borderWidth.2'),
          padding: inputPadding,
        },
        'button:hover': {
          backgroundColor: theme('colors.pink.400'),
        },
        'button:active': {
          backgroundColor: theme('colors.pink.500'),
        },
        input: {
          borderWidth: theme('borderWidth.2'),
          padding: inputPadding,
        },
        'input:hover': {
          borderColor: theme('colors.pink.100'),
        },
        'input:focus': {
          borderColor: theme('colors.pink.300'),
          outline: 'none',
        },
      });
    }),
  ],
};
