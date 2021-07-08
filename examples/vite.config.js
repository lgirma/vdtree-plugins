import {defineConfig} from 'vite'
var path = require('path')

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'vdtree-examples'
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
