import mongoose from 'mongoose'

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
