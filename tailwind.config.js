module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      height: {
        "90vh": "90vh",
      },
      colors: {
        Layout: {
          100: "#F9F9F9",
          300: "#E1E1E1",
          500: "#7C7C7C",
          700: "#1A1A1A",
          600: "#6B6B6B",
        },
        Primary: {
          White: "#fff",
          Gunmetalgrey: "#293241",
          Darkblue: "#161E40",
          Pinkcus: "#ff1e54",
          Rosecus: "#ff5d8f",
          Greencus: "#006770",
        },
        footer: {
          customGradient: "linear-gradient(120deg, #fceabb 100%, #f8b500 100%)",
          background: "#f9f9f9",
        },
        offer: {
          Percentage: "#EE6C4D",
          Button: "linear-gradient(120deg, #FF1E54 100%, #FF5B83 100%)",
        },
        menu: {
          gradient: "linear-gradient(120deg, #fceabb 100%, #f8b500 100%)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};


