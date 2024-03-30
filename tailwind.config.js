// tailwind.config.js
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        "./app/**/*.{js,ts,jsx,tsx,mdx}",

    ],

    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
};