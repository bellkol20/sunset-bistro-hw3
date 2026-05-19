import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../.env') })
}

const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null })

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables')
  }
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((conn) => {
      console.log('MongoDB connected')
      return conn
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
