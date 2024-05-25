const fs = require('fs');

const createViteConfig = () => {
    fs.writeFileSync('./vite.config.js', 
`import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
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
