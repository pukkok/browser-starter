const fs = require('fs')
const http = require('http')
const { exec } = require('child_process') // child_process 모듈 추가
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
  const addScript = `<script defer src="/public/app.js"></script>`

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
  space + `<div id="root">동작확인</div>` + "\n" +
  space + addScript + "\n" +
  // `<script type="text/javascript">console.log('동작')</script>` +
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

const server = http.createServer((req, res) => {
  const filePath = './public/index.html'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  })
})

server.listen(5000, () => {
  console.log('서버동작 시작')
  
  // 서버 시작 후 브라우저 자동 열기
  exec('start http://localhost:5000', (err) => { // 윈도우는 "start"
    if (err) {
      console.log('브라우저 열기 실패:', err)
    }
    // 파일을 열고나서 app.js를 추가하는 방법 찾기
    fs.readFile('./public/app.js', (err, jsFile) => {
      if(err) return console.error('app.js에러')
      // console.log(jsFile)
    })
  })
})

// execSync(`start C:\\...경로...\\test\\${branch}\\${date}`)