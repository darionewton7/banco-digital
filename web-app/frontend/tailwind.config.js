/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Itaú Color Palette
        itau: {
          orange: "#FF6200", // Primary Orange
          blue: "#0056B3",   // Secondary Blue (often used)
          yellow: "#FFCC00", // Accent Yellow
          gray: {
            light: "#F5F5F5", // Light background/neutral
            medium: "#CCCCCC", // Borders/dividers
            dark: "#666666",  // Secondary text
            darker: "#333333", // Primary text
          },
          white: "#FFFFFF",
          black: "#000000",
          error: "#DC3545",
          success: "#28A745",
        },
        // Shadcn/ui related colors (can be adjusted to match Itaú)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Use Itaú light gray
        foreground: "hsl(var(--foreground))", // Use Itaú darker gray
        primary: {
          DEFAULT: "hsl(var(--primary))", // Use Itaú Orange
          foreground: "hsl(var(--primary-foreground))", // Use White
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Use Itaú Blue or Gray
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Use Itaú Error Red
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
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
        // Sidebar colors (can be removed if not using the specific sidebar component)
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

