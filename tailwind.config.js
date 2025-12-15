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
        // Primary brand colors
        primary: {
          DEFAULT: '#317eebff',
          hover: '#1e8bcaff',
          light: '#DFF5F4',
          dark: '#3b6e8aff',
        },

        // Dark mode colors
        dark: {
          bg: '#0f1115',
          card: '#13161c',
          hover: '#1a1d24',
          border: '#27272a',
        },

        // Light mode colors
        light: {
          bg: '#FFFFFF',
          secondary: '#F9FAFA',
          card: '#F5F5F5',
        },

        // Sky/Cyan palette (for accents and special UI elements)
        sky: {
          50: '#E0EDF4',
          100: '#A2CADF',
          200: '#0ea5e9',
          300: '#0891b2',
          400: '#387EA3',
          500: '#25556D',
          600: '#0c4a6e',
          700: '#082f49',
          800: '#012133',
        },

        // Teal/Green palette (for success states and highlights)
        teal: {
          50: '#D9F9E6',
          100: '#B8F1D2',
          200: '#53B483',
          300: '#2F9461',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'primary': '0 10px 40px -10px rgba(49, 126, 235, 0.25)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}
