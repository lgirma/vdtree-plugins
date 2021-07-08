import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'

export default defineConfig({
    plugins: [reactRefresh()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'vdtree-react'
        },
        minify: false,
        rollupOptions: {
            output: {
                globals: {
                    'boost-web-core': 'boost-web-core',
                    'vdtree': 'vdtree',
                    'react': 'react',
                    'react-dom': 'react-dom'
                }
            },
            external: ['vdtree', 'boost-web-core', 'react', 'react-dom']
        }
    }
})
