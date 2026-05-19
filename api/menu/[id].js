import { MenuItem } from '../../server/models/MenuItem.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  const { id } = req.query

  if (req.method === 'PUT') {
    const item = await MenuItem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    return res.status(200).json(item)
  }

  if (req.method === 'DELETE') {
    const item = await MenuItem.findByIdAndDelete(id)
    if (!item) return res.status(404).json({ error: 'Menu item not found' })
    return res.status(200).json({ message: 'Menu item deleted', item })
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
