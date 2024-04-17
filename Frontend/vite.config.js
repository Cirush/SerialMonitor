import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5123,
    proxy: {
      '^/api/.*': {
        target: 'http://serial_monitor_asp:5321',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true
      }
    }
  },
  plugins: [react()],
})
