import { Router } from 'express'
import { Cart } from '../models/Cart.js'

const router = Router()

router.get('/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId })
    if (!cart) {
      cart = await Cart.create({ sessionId: req.params.sessionId, items: [] })
    }
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:sessionId', async (req, res) => {
  try {
    const { items } = req.body
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items must be an array' })
    }
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items },
      { new: true, upsert: true, runValidators: true },
    )
    res.json(cart)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [] },
      { new: true, upsert: true },
    )
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
