/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00e677',
        'background-light': '#f5f8f7',
        'background-dark': '#000000',
        'neutral-dark': '#121212',
        'accent-orange': '#ff9100',
        'electric-green': '#00FF41',
        'discharge-orange': '#FFA500',
        'android-dark': '#1A1C1E',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
