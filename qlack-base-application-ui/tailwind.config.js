/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["inter", "sans-serif", "Helvetica Neue", "arial", "sans-serif"]
      }
    },
  },
  plugins: [
    require("daisyui")
  ]
}
