import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			colors: {
				verde: {
					100: '#e8fdee',
					200: '#c8fad7',
					300: '#98f5b3',
					400: '#6aed92',
					500: '#22c55e',
					600: '#1d9c4b',
					700: '#187538',
					800: '#134d24',
					900: '#0d3618',
					1000: '#08200e',
				},
				coral: {
					50: '#fff0f0',
					100: '#ffe5e5',
					200: '#ffcccc',
					300: '#ff9999',
					400: '#ff6b6b',
					500: '#ff4444',
					600: '#e53e3e',
				},
				branco: {
					100: '#ffffff',
					200: '#f8f8f8',
					300: '#f0f0f0',
					400: '#e8e8e8',
					500: '#e0e0e0',
					600: '#d8d8d8',
					700: '#d0d0d0',
					800: '#c8c8c8',
					900: '#c0c0c0',
					1000: '#b8b8b8',
				},
				preto: {
					50: '#404040',
					100: '#262626',
					200: '#1a1a1a',
					300: '#0d0d0d',
					400: '#000000',
					500: '#000000',
					600: '#000000',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
