/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bage: "#FBF3E1",
        "light-blue": "#6E9ED6",
        "dark-blue": "#0A65D0",
        "cement-gray": "#6C6A6A",
        "ruby-red": "#DD3535",
      },
    },
    fontFamily: {
      inter: ["Inter"],
      montserrat: ["Montserrat"],
    },
  },
  plugins: [],
};
