/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#050505',
                'glow-primary': '#00f2ff',
                'glow-secondary': '#bd00ff',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'aurora': 'aurora-flow 10s infinite ease-in-out',
                'float': 'float 6s infinite ease-in-out',
            },
        },
    },
    plugins: [],
}
