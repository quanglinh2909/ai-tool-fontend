/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['var(--font-public-sans)'],
          'barlow-bold': ['var(--font-barlow-bold)'],
          'barlow-extrabold': ['var(--font-barlow-extrabold)'],
        },
      },
    },
    plugins: [],
  };