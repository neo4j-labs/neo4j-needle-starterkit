import { tailwindConfig } from '@neo4j-ndl/base';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{html,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  // This is the only line you need to include as a preset
  presets: [tailwindConfig],
  // By default this configuration will have a prefix "n-"
  // for all utility classes. If you want to remove it you can
  // do with an empty string as a prefix, which is convenient
  // for existing tailwind projects
  prefix: '',
  // Be sure to disable preflight,
  // as we provide our own Preflight (CSS Reset)
  // with Needle out of the box
  corePlugins: {
    preflight: false,
  },
};