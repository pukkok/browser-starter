const fs = require('fs')
const http = require('http')

/**
 * html 템플릿 생성
 * 
 * 컴포넌트 함수 개별로 생성
 * 
 * 
 */

const Template = (title = 'document') => {
  let result = ""

  const addStyle = `<link rel="stylesheet" href="/public/style.css">`
  const addScript = `<script src="/public/app.module.js"></script>`

  const DOCTYPE = `<!DOCTYPE html>`
  const space = "  "
  const html = (children) => {
    let result = 
    '<html lang="ko">' + "\n" + 
    children + "\n" + 
    "</html>"
    return result
  }
  const head =
  "<head>" + "\n" +
  space + '<meta charset="UTF-8">' + "\n" +
  space + '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + "\n" +
  space + `<title>${title}</title>` + "\n" +
  space + addStyle + "\n"
  "</head>" + "\n"

  const body = 
  "<body>" + "\n" +
  space + `<div id="root"></div>` + "\n" +
  space + addScript + "\n" +
  "</body>"
  
  result = 
  DOCTYPE + "\n" +
  html(head + body)

  return result
}

const html = Template('document')

fs.writeFile('public/index.html', html, 'utf-8', (err) => {
  if(err) return console.log(err)
})


const app = http.createServer((req, res) => {
    const url = '/public/index.html'
    // if(req.method === 'GET'){
    //   if(req.url === '/'){
    //     fs.readFile('./index.html', 'utf-8', (err, data) => {
    //       if(err) console.log(err)
    //     })
    //   }
    // }
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('public/index.html', 'utf-8', (err, data) => {
      if(err) return console.log(err)
      res.end(data, 'utf-8')
    })
})

app.listen(5000, () => {
  console.log('5000번 동작')
})