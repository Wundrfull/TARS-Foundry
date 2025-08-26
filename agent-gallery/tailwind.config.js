const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Kurzgesagt-inspired color palette
      colors: {
        kg: {
          // Primary web colors (professional minimalism)
          bg: {
            primary: "#ffffff",
            secondary: "#f8f9fa",
            tertiary: "#f0f2f4",
          },
          text: {
            primary: "#1a1a1a",    // Near black (high contrast)
            secondary: "#666666",   // Medium gray
            tertiary: "#999999",    // Light gray
          },
          button: {
            primary: "#208bd2",     // Professional blue
            hover: "#1a7cb8",       // Darker blue
          },
          accent: {
            orange: "#e32e01",      // Kurzgesagt signature orange
            pink: "#e30050",        // Vibrant pink for highlights
            yellow: "#fbbe00",      // Golden yellow for badges
            purple: "#6500d7",      // Purple for special states
          },
          border: {
            primary: "#e1e5e9",     // Light gray borders
            secondary: "#d4d8dc",   // Medium gray borders
          }
        }
      },
      // Typography
      fontFamily: {
        sans: ["Rubik", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      // Spacing system (8px base)
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '80px',
        '4xl': '100px',
      },
      // Box shadows
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.12)',
        'button-hover': '0 4px 12px rgba(32,139,210,0.25)',
        'modal': '0 8px 32px rgba(0,0,0,0.2)',
      },
      // Animation
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      // Border radius
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
      },
      // Max width
      maxWidth: {
        'content': '720px',
        'container': '1200px',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#ffffff",
          foreground: "#1a1a1a",
          divider: "#e1e5e9",
          primary: {
            DEFAULT: "#208bd2",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#666666",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#17c964",
            foreground: "#ffffff",
          },
          warning: {
            DEFAULT: "#fbbe00",
            foreground: "#1a1a1a",
          },
          danger: {
            DEFAULT: "#e32e01",
            foreground: "#ffffff",
          },
          focus: "#208bd2",
        },
      },
    },
  })],
}