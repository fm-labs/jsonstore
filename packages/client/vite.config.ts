import { defineConfig } from 'vite'
import tsobjectPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts(), tsobjectPaths()],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'JsonStoreClient',
      fileName: (format) => `jsonstore-client.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {},
    },
  },
})
