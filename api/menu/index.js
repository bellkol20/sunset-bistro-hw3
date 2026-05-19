import { MenuItem } from '../../server/models/MenuItem.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  if (req.method === 'GET') {
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
    return res.status(200).json(menuSections)
  }

  if (req.method === 'POST') {
    const item = await MenuItem.create(req.body)
    return res.status(201).json(item)
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
