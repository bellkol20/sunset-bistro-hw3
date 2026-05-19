import { Router } from 'express'
import { MenuItem } from '../models/MenuItem.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const items = await MenuItem.find().sort({ section: 1, name: 1 })
    const sections = {}
    for (const item of items) {
      if (!sections[item.section]) sections[item.section] = []
      sections[item.section].push(item)
    }
    const menuSections = Object.entries(sections).map(([title, sectionItems]) => ({
      title,
      items: sectionItems,
    }))
    res.json(menuSections)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/items', async (_req, res) => {
  try {
    const items = await MenuItem.find().sort({ section: 1, name: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    res.json({ message: 'Menu item deleted', item })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
