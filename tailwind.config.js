/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                misstna: {
                    gold: '#D4AF37',
                    'dark-blue': '#003366',
                    turquoise: '#00CED1',
                    dark: '#1a1a1a',
                    light: '#f5f5f5',
                },
            },
            backgroundImage: {
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFC700 100%)',
                'gradient-dark': 'linear-gradient(135deg, #003366 0%, #1a1a2e 100%)',
            },
        },
    },
    plugins: [],
};
