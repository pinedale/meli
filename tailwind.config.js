import { colors } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        "primary-yellow": "#FFE600",
        "primary-gray": "#EEEEEE"
      },
      maxWidth: {
        'default': '980px',
      }
    },
  },
  plugins: [],
}