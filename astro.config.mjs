import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@layouts': path.resolve('./src/layouts'),
      }
    }
  },
  integrations: [react()],
  site: "https://adarsh.work",
  output: "static",
});