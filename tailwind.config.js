/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors:{
          'blue-theme':"#0CCBFF",
          'orage-theme':'#FFB800'
        },
        fontFamily: {
          roboto: ['Roboto_400Regular','Roboto_700Bold']
        },
      },
    },
    plugins: [],
  }