import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A09D',
          hover: '#008f8c',
          light: '#DFF5F4',
          dark: '#006b69',
        },
        dark: {
          bg: '#0f1115',
          card: '#13161c',
          hover: '#1a1d24',
          border: '#27272a',
        },
        light: {
          bg: '#FFFFFF',
          secondary: '#F9FAFA',
          card: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'primary': '0 10px 40px -10px rgba(0, 160, 157, 0.25)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}
