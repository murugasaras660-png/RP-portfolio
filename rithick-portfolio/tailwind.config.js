/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--color-bg)',
        'cream-wash': 'var(--color-bg-wash)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        'ink-2': 'var(--color-ink-2)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'accent-hi': 'var(--color-accent-hi)',
        line: 'var(--color-line)',
        'line-strong': 'var(--color-line-strong)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        display: 'clamp(2.5rem, 1.75rem + 3.5vw, 4.5rem)',
        h2: 'clamp(1.75rem, 1.4rem + 1.8vw, 3rem)',
        h3: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
        lead: 'clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)',
        body: 'clamp(1rem, 0.975rem + 0.15vw, 1.0625rem)',
        nav: '0.9375rem',
        button: '0.875rem',
        meta: '0.8125rem',
      },
      maxWidth: {
        container: '1200px',
        measure: '65ch',
      },
      spacing: {
        'section-y': 'clamp(4.5rem, 3rem + 6vw, 8rem)',
        'nav-height': 'var(--nav-height)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        full: '999px',
      },
    },
  },
  plugins: [],
};
