import { connectDB } from '../../server/config/db.js'

export function withApi(handler) {
  return async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }

    try {
      await connectDB()
      return await handler(req, res)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: err.message || 'Server error' })
    }
  }
}
