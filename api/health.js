import { withApi } from './_lib/withApi.js'

export default withApi(async (_req, res) => {
  res.status(200).json({ status: 'ok' })
})
