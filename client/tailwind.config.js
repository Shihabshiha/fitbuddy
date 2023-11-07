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
      extend: {
        backgroundColor: {
          'custom-chat': '#3F4744',
          'custom-deeper-chat' : '#2F3633',
          'custom-chat-msg-right' : '#00a884',
        },
      },
    },
    plugins: [
      flowbitePlugin
    ],
  }
) 

