import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import apiApp from './apiApp.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  const clientDist = path.join(__dirname, '..', 'dist')
  apiApp.use(express.static(clientDist))
  apiApp.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

export default apiApp
