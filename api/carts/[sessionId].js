import { Cart } from '../../server/models/Cart.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  const { sessionId } = req.query

  if (req.method === 'GET') {
    let cart = await Cart.findOne({ sessionId })
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] })
    }
    return res.status(200).json(cart)
  }

  if (req.method === 'PUT') {
    const { items } = req.body
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items must be an array' })
    }
    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { items },
      { new: true, upsert: true, runValidators: true },
    )
    return res.status(200).json(cart)
  }

  if (req.method === 'DELETE') {
    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { items: [] },
      { new: true, upsert: true },
    )
    return res.status(200).json(cart)
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
