// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      xs: '400px',     // Extra small (custom)
      sm: '640px',     // Small (default)
      md: '768px',     // Medium
      lg: '1024px',    // Large
      xl: '1280px',    // Extra Large
      '2xl': '1536px', // Extra Extra Large
    },
  },
  plugins: [],
}

export default config
