/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Primary Brand Colors
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a5a5ff',
          400: '#8080ff',
          500: '#5d5dff', // Main brand blue/purple
          600: '#4747ff',
          700: '#3636e6',
          800: '#2929cc',
          900: '#1f1fb3',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // Secondary Accent (Purple buttons)
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Main purple for buttons
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Background Colors
        "background-custom": {
          light: '#f8f9ff', // Light blue background
          white: '#ffffff',
          card: '#ffffff',
          dark: '#0a0e27', // Dark navy footer
        },
        // Text Colors
        text: {
          primary: '#1a1a2e',
          secondary: '#6b7280',
          muted: '#9ca3af',
          light: '#d1d5db',
        },
        // Pastel/Soft Colors (for illustrations)
        pastel: {
          blue: '#d4e4ff',
          purple: '#e8d9ff',
          pink: '#ffd9e8',
          green: '#d9ffe8',
          yellow: '#fff9d9',
        },
        // Avatar/Badge Colors
        avatar: {
          blue: '#5d5dff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          green: '#10b981',
        },
        // Status Colors
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Gradients
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #5d5dff 0%, #8b5cf6 100%)',
        'hero-gradient': 'linear-gradient(180deg, #f8f9ff 0%, #e8f0ff 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(93, 93, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
      // Box Shadows
      boxShadow: {
        'soft': '0 2px 15px rgba(93, 93, 255, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'button': '0 4px 12px rgba(93, 93, 255, 0.3)',
        'button-hover': '0 6px 20px rgba(93, 93, 255, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fly-wobble": {
          "0%, 100%": { transform: "translateY(0px) rotate(-5deg)" },
          "50%": { transform: "translateY(-8px) rotate(-3deg)" },
        },
        "sway": {
          "0%, 100%": { transform: "translateX(-50%) rotate(0deg)" },
          "50%": { transform: "translateX(-50%) rotate(3deg)" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        "bounce": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 8s ease-in-out infinite",
        "fly-wobble": "fly-wobble 3s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "bob": "bob 4s ease-in-out infinite",
        "bounce": "bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
