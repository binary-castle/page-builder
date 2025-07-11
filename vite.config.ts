import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import scss from "rollup-plugin-scss";
import dts from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'bc-page-builder',
            fileName: format => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: "Vue"
                },
                assetFileNames: "bc-page-builder.[ext]",
            },
            plugins: [
                scss()
            ]
        }
    },
    plugins: [vue(), dts(), tailwindcss()]
})
