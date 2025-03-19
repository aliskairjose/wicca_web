/** @type {import('tailwindcss').Config} */
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
  ],
  flyonui: {
    vendors: true, // Enable vendor-specific CSS generation
  },
};
