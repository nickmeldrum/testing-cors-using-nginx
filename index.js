const express = require('express')
const www = express()
const api = express()

www.use(express.static('client'))
www.get('/api/products/', (req, res) => { res.json('{"data": "returned from www"}') })
www.listen(3081)

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://www.website.com:3080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
api.get('/api/products/', (req, res) => { res.json('{"data": "returned from api"}') })
api.listen(3082)
