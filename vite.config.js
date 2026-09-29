import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// If using Inertia's official Vite plugin (or standard resolution helpers):
// import inertia from '@inertiajs/vite-plugin'; 

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', { weights: [400, 500, 600] }),
            ],
        }),
        react(),
        tailwindcss(),
        // inertia({ framework: 'react' }),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        host: '0.0.0.0', 
        cors: true,      
        hmr: {
            host: '192.168.1.170', 
        },
    },
});
