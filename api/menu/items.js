import { MenuItem } from '../../server/models/MenuItem.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const items = await MenuItem.find().sort({ section: 1, name: 1 })
  return res.status(200).json(items)
})
