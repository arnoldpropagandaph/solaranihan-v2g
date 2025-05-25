import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./src/**/**/*.{html,js,svelte,ts}"
	],
	theme: {
		container: {
			center: true,
			padding: "1rem"
		},
		extend: {
			colors: {
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49',
				},
				secondary: "#64748b",
				accent: "#10b981",
				warning: "#f59e0b",
				danger: "#ef4444"
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			animation: {
				'pulse-green': 'pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'pulse-orange': 'pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'flow-down': 'flow-down 3s ease-out infinite',
				'flow-up': 'flow-up 3s ease-out infinite'
			},
			keyframes: {
				'pulse-green': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.5)' },
					'50%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' }
				},
				'pulse-orange': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(251, 146, 60, 0.5)' },
					'50%': { boxShadow: '0 0 0 10px rgba(251, 146, 60, 0)' }
				},
				'flow-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(40px)', opacity: '0' }
				},
				'flow-up': {
					'0%': { transform: 'translateY(40px)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-20px)', opacity: '0' }
				}
			}
		}
	},
	plugins: []
};

export default config;
