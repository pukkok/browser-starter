import http from 'http'
import fs from 'fs'
import { exec } from 'child_process' // child_process 모듈 추가
import Template from './src/createTemplate.js'
import FileReader from './src/fileReader.js'

const html = new Template('Wait React')

// 파일 쓰기
fs.writeFile('public/index.html', html.render(), 'utf-8', (err) => {
  if(err) return console.log(err)
})

const server = http.createServer((req, res) => {
  // console.log(req)
  const currentFile = new FileReader(res, req.url)
  const xx = new FileReader(res, '123')
  
  currentFile.read()
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