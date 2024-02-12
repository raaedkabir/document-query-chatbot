import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        light: '#E9E8EE',
        DEFAULT: '#99989F',
        dark: '#575151',
      },
      primary: {
        '50': '#f0f0fd',
        '100': '#e3e4fc',
        '200': '#ccccf9',
        '300': '#b0adf4',
        '400': '#897ceb',
        DEFAULT: '#897ceb',
        '500': '#8670e4',
        '600': '#7754d7',
        '700': '#6745bd',
        '800': '#543a99',
        '900': '#46357a',
        '950': '#2a1f47',
      },
      secondary: {
        '50': '#eff2fe',
        '100': '#e2e5fd',
        '200': '#cbd0fa',
        '300': '#b2b7f6',
        DEFAULT: '#b2b7f6',
        '400': '#8a8aef',
        '500': '#776ee6',
        '600': '#6752d9',
        '700': '#5943bf',
        '800': '#49399a',
        '900': '#3e347b',
        '950': '#251f47',
      },
      error: '#D65E57',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-montserrat)', ...fontFamily.sans],
        body: ['var(--font-nunito)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    'grid-cols-1',
    'lg:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
  ],
  plugins: [],
}
export default config
