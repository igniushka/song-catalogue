import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/admin/create": {
        target: "https://your-remote-domain.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})

// export default defineConfig({

//   // some other configuration
// })