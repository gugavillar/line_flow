/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/preline/preline.js',
	],
	theme: {
		extend: {
			colors: {
				brand: '#236599',
			},
		},
	},
	plugins: [require('preline/plugin')],
} satisfies Config
