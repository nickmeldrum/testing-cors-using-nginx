const express = require('express')
const www = express()
const api = express()

www.use(express.static('client'))
www.get('/api/products/', (req, res) => { res.json('{"data": "returned from www"}') })
www.listen(3081)

api.get('/api/products/', (req, res) => { res.json('{"data": "returned from api"}') })
api.listen(3082)
