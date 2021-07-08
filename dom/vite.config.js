var path = require('path')
import { defineConfig } from 'vite'


export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'vdtree-dom'
        },
        minify: false,
        rollupOptions: {
            output: {
                globals: {
                    'boost-web-core': 'boost-web-core',
                    'vdtree': 'vdtree'
                }
            },
            external: ['vdtree', 'boost-web-core']
        }
    }
})