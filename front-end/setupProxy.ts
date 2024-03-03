import express from 'express'
import { defineConfig, ViteDevServer } from 'vite'

const app = express()

app.get('/api', (req, res) => {
  res.send('Hello world!').end()
})

function expressPlugin() {
  return {
    name: 'express-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(app)
    }
  }
}

export default defineConfig({
  plugins: [expressPlugin()]
})