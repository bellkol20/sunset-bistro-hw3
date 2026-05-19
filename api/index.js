import serverless from 'serverless-http'
import app from '../server/apiApp.js'

export default serverless(app)
