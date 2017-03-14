const http = require('http')  

const requestHandler1 = (request, response) => { response.end('{"info": "Hello world 1"}') }
const requestHandler2 = (request, response) => {  response.end('{"info": "Hello world 2"}') }

const serverListener = (number, handler) => {
  const port = 3080 + number
  http.createServer(handler).listen(port, err => {  
    if (err) console.error(err)
    console.log(`server ${number} is listening on ${port}`)
  })
}

serverListener(1, requestHandler1)
serverListener(2, requestHandler2)
