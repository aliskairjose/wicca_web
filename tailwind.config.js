/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flyonui/dist/js/*.js",
    "./node_modules/notyf/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors(),
  ],
  flyonui: {
    themes: [
      {
        orbeTheme: {
          primary: "#1d4747",
          secondary: "#CFAA61",
          accent: "#716C47",
          neutral: "#374151",
          white: "#f8fafc",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      "corporate",
    ],
    base: true,
    styled: true,
    utils: true,
    vendors: true, // Enable vendor-specific CSS generation
  },
};
