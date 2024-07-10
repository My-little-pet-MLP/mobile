/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors:{
          'blue-theme':"#0CCBFF"
        },
        fontFamily: {
          roboto: ['Roboto_400Regular'],
          crimson: ['CrimsonText_400Regular'],
          poppins: ['Poppins_400Regular'],
        },
      },
    },
    plugins: [],
  }