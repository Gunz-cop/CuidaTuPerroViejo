/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          bg: 'rgb(var(--color-bg-base-rgb) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card-rgb) / <alpha-value>)',
          'card-hover': 'rgb(var(--color-bg-card-hover-rgb) / <alpha-value>)',
          text: 'rgb(var(--color-text-base-rgb) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted-rgb) / <alpha-value>)',
          primary: 'rgb(var(--color-brand-primary-rgb) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-brand-primary-hover-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-brand-secondary-rgb) / <alpha-value>)',
          accent: 'rgb(var(--color-brand-accent-rgb) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-brand-accent-hover-rgb) / <alpha-value>)',
          border: 'rgb(var(--color-brand-border-rgb) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}
