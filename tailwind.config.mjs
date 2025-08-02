/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [require("tailwindcss-animate")],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
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
    			},
    			'gradient-primary': 'hsl(var(--gradient-primary))',
    			'gradient-secondary': 'hsl(var(--gradient-secondary))',
    			'gradient-primary-hover': 'hsl(var(--gradient-primary-hover))',
    			'gradient-secondary-hover': 'hsl(var(--gradient-secondary-hover))',
    			'gradient-primary-light': 'hsl(var(--gradient-primary-light))',
    			'gradient-secondary-light': 'hsl(var(--gradient-secondary-light))',
    			'gradient-primary-subtle': 'hsl(var(--gradient-primary-subtle))',
    			'gradient-secondary-subtle': 'hsl(var(--gradient-secondary-subtle))',
    			// Additional girly colors
    			'pink': {
    				'50': 'hsl(350 100% 97%)',
    				'100': 'hsl(345 100% 95%)',
    				'200': 'hsl(340 100% 90%)',
    				'300': 'hsl(335 100% 85%)',
    				'400': 'hsl(330 100% 75%)',
    				'500': 'hsl(320 100% 60%)',
    				'600': 'hsl(315 100% 55%)',
    				'700': 'hsl(310 100% 50%)',
    				'800': 'hsl(305 100% 45%)',
    				'900': 'hsl(300 100% 40%)',
    			},
    			'purple': {
    				'50': 'hsl(290 100% 97%)',
    				'100': 'hsl(285 100% 95%)',
    				'200': 'hsl(280 100% 90%)',
    				'300': 'hsl(275 100% 85%)',
    				'400': 'hsl(270 100% 80%)',
    				'500': 'hsl(280 100% 70%)',
    				'600': 'hsl(275 100% 65%)',
    				'700': 'hsl(270 100% 60%)',
    				'800': 'hsl(265 100% 55%)',
    				'900': 'hsl(260 100% 50%)',
    			}
    		}
    	}
    }
}
