import { colors } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        "primary-gray": "#EEEEEE",
        "green-app": "#008489",
        "red-app": "#FF5A5F",
      },
      maxWidth: {
        'default': '980px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}