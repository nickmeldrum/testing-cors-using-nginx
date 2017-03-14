const express = require('express')
const cookieParser = require('cookie-parser')
const www = express()
const api = express()

www.use((req, res, next) => {
  res.cookie('mycookie', 'some random data', { domain: '.website.com', maxAge: 900000, httpOnly: true })
  next()
})
www.use(express.static('client'))
www.get('/api/products/', (req, res) => { res.json('{"data": "returned from www"}') })
www.listen(3081)

api.use(cookieParser())
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://www.website.com:3080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
api.use('/api/products/', (req, res) => {
  console.log(req.cookies.mycookie)
  res.json('{"data": "returned from api"}')
})
api.listen(3082)
