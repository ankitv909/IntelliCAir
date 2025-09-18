import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,

        padding: {
          DEFAULT: '1rem', sm: '2rem', lg: '2rem', xl: '4rem', '2xl': '6rem',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        base: ['12px', '1.5rem'], // Font size for small text
        baseXs: ['13px', '1.5rem'], // Font size for triple extra-large text
        sm: ['14px', '1.5rem'], // Font size for base text
        medium: ['16px', '1.5rem'], // Font size for large text
        large: ['18px', '1.5rem'], // Font size for extra-large text
        'xl': ['20px', '1.75rem'],  // Font size for double extra-large text
        '2xl': ['24px', '2rem'], // Font size for double extra-large text
        '3xl': ['28px', '2.5rem'], // Font size for triple extra-large text
      },
      colors: {
        primary: '#0924F2', // Custom primary color
        secondary: '#0F62FE', // Custom secondary color
        green: '#00A06C', // Custom accent color
        neutral: '#F5F5F5', // Custom neutral color
        black: '#18191C', // Custom black color
        light_grey: '#767F8C', // Custom light grey color
        dark_grey: '#505050', // Custom dark grey color
      },
      fontWeight: {
        thin: '100',
        extraLight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;
