/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      button: {
        // size: {
        //   sm: 'w-4 h-4',
        //   md: 'w-6 h-6',
        //   lg: 'w-8 h-8',
        // },
        // color: {
        //   primary: 'bg-blue-500 hover:bg-blue-700 text-white',
        //   secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
        //   success: 'bg-green-500 hover:bg-green-700 text-white',
        //   danger: 'bg-red-500 hover:bg-red-700 text-white',
        //   warning: 'bg-yellow-500 hover:bg-yellow-700 text-white',
        //   info: 'bg-cyan-500 hover:bg-cyan-700 text-white',
        // },
        // rounded: {
        //   true: 'rounded-full',
        // },
        // shadow: {
        //   true: 'shadow-md',
        // },
        // disabled: {
        //   opacity: 0.5,
        //   cursor: 'not-allowed',
        // },
      },
    },
  },
  plugins: [],
}