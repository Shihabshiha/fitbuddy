/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import flowbitePlugin from 'flowbite/plugin'

export default withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {},
    },
    plugins: [
      flowbitePlugin
    ],
  }
) 

