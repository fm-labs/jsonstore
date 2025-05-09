import { defineConfig } from 'vite'
import tsobjectPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  //@ts-ignore
  plugins: [/*dts(),*/ tsobjectPaths(), react()],

  server: {
    port: 31000,
  },

  base: './', // this is needed for the app to work in subdirectories

  build: {
    sourcemap: false, // only for debugging
    minify: 'esbuild', // or "terser" (esbuild is faster)
    cssCodeSplit: true, // separate css for better caching

    rollupOptions: {
      //external: ['react', 'react-dom'],
      output: {
        // globals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM',
        // },
        // manualChunks: {
        //     ...renderChunks(dependencies),
        // }
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
})
