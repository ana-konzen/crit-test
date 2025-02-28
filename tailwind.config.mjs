/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "var(--red)",
        lightRed: "var(--light-red)",
        cream: "var(--cream)",
        black: "var(--black)",
        white: "var(--white)",
        gray: "var(--gray)",
        lightGray: "var(--light-gray)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      width: {
        menu: "var(--menu-width)",
        block: "var(--block-width)",
      },
    },
  },
  plugins: [],
};
