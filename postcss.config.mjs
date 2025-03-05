/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Added autoprefixer which is typically needed with Tailwind
  },
};

export default config;
