import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: 'root',
    }),
  ],
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
  },
  server: {
    port: 3000,
  },
});
