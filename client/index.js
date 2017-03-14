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
  const request = url => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => logger.log(xhr.response))
    xhr.addEventListener('error', err => logger.log(err))
    xhr.addEventListener('abort', () => logger.log('aborted'))
    xhr.open('GET', url, true)
    xhr.withCredentials = 'true'
    xhr.send()
    logger.log(`request to ${url} initiated...`)
  }

  return { request }
})()

xhr.request('http://api.website.com:3080/api/products/')

xhr.request('http://www.website.com:3080/api/products/')
