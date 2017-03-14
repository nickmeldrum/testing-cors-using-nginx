const logger = (() => {
  const resultsElement = document.getElementById('results')
  const log = msg => {
    console.log(msg)
    const node = document.createElement('li')
    const textNode = document.createTextNode(msg)
    node.appendChild(textNode)
    resultsElement.appendChild(node)
  }
  return { log }
})()

const xhr = (() => {
  const request = (method, url, body) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => logger.log(`success response ${xhr.response} from request ${url}`))
    xhr.addEventListener('error', err => logger.log(`err ${err} from request ${url}`))
    xhr.addEventListener('abort', () => logger.log(`request ${url} aborted`))
    xhr.open(method, url, true)
    if (method === 'POST') {
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.withCredentials = 'true'
    xhr.send(body)
    logger.log(`request to ${url} initiated...`)
  }

  return { request }
})()

xhr.request('GET', 'http://api.website.com:3080/api/products/')
xhr.request('POST', 'http://api.website.com:3080/api/products/', '{"name": "avocado"}')

