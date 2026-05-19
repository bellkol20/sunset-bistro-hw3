import { Cart } from '../../server/models/Cart.js'
import { Order } from '../../server/models/Order.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  if (req.method === 'GET') {
    const orders = await Order.find().sort({ createdAt: -1 })
    return res.status(200).json(orders)
  }

  if (req.method === 'POST') {
    const { sessionId, customerName } = req.body
    if (!sessionId) return res.status(400).json({ error: 'sessionId is required' })

    const cart = await Cart.findOne({ sessionId })
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = await Order.create({
      sessionId,
      items: cart.items,
      total,
      customerName: customerName || 'Guest',
    })

    cart.items = []
    await cart.save()

    return res.status(201).json(order)
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
