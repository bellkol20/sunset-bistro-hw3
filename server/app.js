import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import menuRoutes from './routes/menu.js'
import cartRoutes from './routes/carts.js'
import orderRoutes from './routes/orders.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/menu', menuRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'dist')
  app.use(express.static(clientDist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

await connectDB()

export default app
