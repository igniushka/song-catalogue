import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      "/admin/user/authenticate": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/admin/user/create": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/song": {
        target: "http://localhost:8081",
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