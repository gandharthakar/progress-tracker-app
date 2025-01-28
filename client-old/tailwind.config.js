/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'xsm-1': '401px',
			sm: '640px',
			md: '768px',
			'mdl-1': '992px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				"theme-grey-1": "#f4f4f4"
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				roboto_mono: ['Roboto Mono', 'serif']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

