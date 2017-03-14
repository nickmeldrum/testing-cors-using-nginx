const resultsElement = document.getElementById('results')
const log = msg => {
  console.log(msg)
  const node = document.createElement('li')
  const textNode = document.createTextNode(msg)
  node.appendChild(textNode)
  resultsElement.appendChild(node)
}
const xhr = new XMLHttpRequest()
const url = `http://host2.com:3080/api/products/`
xhr.addEventListener('load', () => log(xhr.response))
xhr.addEventListener('error', err => log(err))
xhr.addEventListener('abort', () => log('aborted'))
xhr.open('GET', url, true)
xhr.withCredentials = 'true'
xhr.send()
log('sent')
