/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: { sans: ["Vazirmant"] },
    extend: {
      textColor: {
        DEFAULT: "#202F3D",
      },
      boxShadow: {
        custom: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      colors: {
        primary: "#202F3D",
        secondary: "#FB9255",
        dim: "#394653",
        error: "#FF4837",
        "primary-bg": "#F4F5F6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        DEFAULT: "#202F3D",
      },
    },
  },
  plugins: [],
};
