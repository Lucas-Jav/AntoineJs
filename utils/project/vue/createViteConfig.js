const fs = require('fs');

const createViteConfig = () => {
    fs.writeFileSync('./vite.config.js', 
`import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    server: {
        open: true
    }
});
`
);
}

module.exports = { createViteConfig };
