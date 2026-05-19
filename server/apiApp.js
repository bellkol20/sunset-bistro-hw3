import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })
import express from 'express'
import { connectDB } from './config/db.js'
import menuRoutes from './routes/menu.js'
import cartRoutes from './routes/carts.js'
import orderRoutes from './routes/orders.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    res.status(500).json({ error: 'Database connection failed' })
  }
})

app.use('/api/menu', menuRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)

export default app
