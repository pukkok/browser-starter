const fs = require('fs')
const http = require('http')
const { exec } = require('child_process') // child_process 모듈 추가

/**
 * @description 
 * root를 가진 html파일로 생성
 * 작동 확인을 하기 위해 "html 실행 확인"을 브라우저에 띄움
 */
const Template = (title = 'document') => {
  let result = ""

  const addStyle = `<link rel="stylesheet" href="./public/style.css">`
  const addScript = `<script type="module" src="./public/app.js"></script>`

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
  space + `<div id="root">html 실행 확인</div>` + "\n" +
  space + addScript + "\n" +
  "</body>"
  
  result = 
  DOCTYPE + "\n" +
  html(head + body)

  return result
}

const html = Template('Wait React')

// 파일 쓰기
fs.writeFile('public/index.html', html, 'utf-8', (err) => {
  if(err) return console.log(err)
})

/**
 * @param {string} res 
 * @param {string} path 
 * @param {string} fileContentType 
 * 
 * @description path와 fileContentType을 받아 응답(res)을 전달해 줍니다.
 */
const fileReader = (res, url) => {
  
  if(url === '/') {
    fs.readFile('./public/index.html', (err, readFile) => {
    if(err) return console.error('index.html 불러오기 실패')
      
      res.writeHead(200, { 'Content-Type' : 'text/html' })
      res.end(readFile)
    })
    return
  }

  const extender = url.split('.')[1]
  const fileContentType = extractContentType(extender)
  const path = "."+url 
  // console.log('url : ', url)
  // console.log('타입 : ', fileContentType)
  fs.readFile(path, (err, readFile) => {
    if(err) return console.error('파일 읽기 실패 : ', path)
    
    res.writeHead(200, { 'Content-Type' : fileContentType })
    res.end(readFile)
  })
}

function extractContentType (extender) {
  switch(extender) {
    case 'html' : return 'text/html'
    case 'css' : return 'text/css'
    case 'json' : return 'application/json'
    case 'js' : return 'application/javascript'
  }
}

const server = http.createServer((req, res) => {
  // console.log(req)
  fileReader(res, req.url)
})

server.listen(5000, () => {
  console.log('서버동작 시작')
  
  // 서버 시작 후 브라우저 자동 열기
  exec('start http://localhost:5000', (err) => { // 윈도우는 "start"
    if (err) {
      console.log('브라우저 열기 실패:', err)
    }
  })
})