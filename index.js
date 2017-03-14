const express = require('express')
const www = express()
const api = express()

www.use(express.static('client')).listen(3081)

api.get('/api/products/', (req, res) => { res.json('{"data": "oh hai there"}') }).listen(3082)
