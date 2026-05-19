import { Router } from 'express'
import { Cart } from '../models/Cart.js'
import { Order } from '../models/Order.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
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

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order deleted', order })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
