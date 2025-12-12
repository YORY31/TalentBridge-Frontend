module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos
        'background-main': '#0f172a',
        'background-purple': '#581c87',
        'background-violet': '#4c1d95',
        'background-header': 'rgba(15, 23, 42, 0.8)',
        
        // Acentos
        'accent-purple': '#a855f7',
        'accent-fuchsia': '#d946ef',
        'accent-pink': '#ec4899',
        
        // Texto
        'text-primary': '#f1f5f9',
        'text-secondary': '#cbd5e1',
        'text-hover': '#c084fc',
      },
      backdropBlur: {
        'header': '12px',
      },
    },
  },
  plugins: [],
};