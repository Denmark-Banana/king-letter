/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,lib,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'RoundedFixedsys': ['RoundedFixedsys', 'sans-serif'],
        'PfStardust': ['PfStardust', 'sans-serif'],
        'DosHandwriting': ['DosHandwriting', 'cursive'],
        'DOSIyagiMedium': ['DOSIyagiMedium', 'monospace'],
        'Galmuri9': ['Galmuri9', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

