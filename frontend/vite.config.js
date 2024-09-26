// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// // })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// export default defineConfig({
//   plugins: [
//     react(),
//     NodeGlobalsPolyfillPlugin({
//       buffer: true
//     }),
//     NodeModulesPolyfillPlugin()
//   ],
//   resolve: {
//     alias: {
//       buffer: 'buffer'
//     }
//   }
// });
// vite.config.js
// import { defineConfig } from 'vite';

// // Import Node polyfills
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// export default defineConfig({
//   resolve: {

//     alias: {
//       // Polyfill Buffer globally
//       buffer: 'buffer',
//       crypto: 'crypto-browserify', // Use `crypto-browserify` to polyfill the crypto module

//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       // Node.js global to browser polyfill
//       define: {
//         global: 'globalThis',
//       },
//       // Enable polyfills
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           process: true,
//           buffer: true,
//         }),
//         NodeModulesPolyfillPlugin(),
//       ],
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true, // Enable polyfills for the 'crypto' module
    }),
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify', // Use `crypto-browserify` to polyfill the crypto module
    },
  },
});

