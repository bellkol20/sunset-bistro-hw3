import { Order } from '../../server/models/Order.js'
import { withApi } from '../_lib/withApi.js'

export default withApi(async (req, res) => {
  const { id } = req.query

  if (req.method === 'GET') {
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    return res.status(200).json(order)
  }

  if (req.method === 'PATCH') {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    return res.status(200).json(order)
  }

  if (req.method === 'DELETE') {
    const order = await Order.findByIdAndDelete(id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    return res.status(200).json({ message: 'Order deleted', order })
  }

  return res.status(405).json({ error: 'Method not allowed' })
})
