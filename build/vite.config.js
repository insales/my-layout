import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  root: fileURLToPath(new URL('..', import.meta.url)),
  publicDir: false,
  server: {
    host: 'localhost',
    port: 8000,
    strictPort: true,
    open: false,
  },
  plugins: [{
    name: 'playground-library-sources',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(/(href=")(?:\.\.\/)?dist\/styles\/core-css\.css(?=">)/g, '$1/src/styles/core-css.scss')
          .replace(/(src=")(?:\.\.\/)?dist\/scripts\/my-layout\.js/g, '$1/src/scripts/my-layout.js');
      },
    },
  }],
});
