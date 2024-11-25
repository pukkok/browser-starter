import fs from 'fs'

/**
 * @param {string} res 
 * @param {string} path 
 * @param {string} fileContentType 
 * 
 * @description path와 fileContentType을 받아 응답(res)을 전달해 줍니다.
 */
class FileReader {
	constructor (res, url){
		this.res = res
		this.url = url
	}

	_extender() {
		return this.url.split('.')[1]
	}
	
	fileContentType () {
		switch(this._extender()) {
			case 'html' : return 'text/html'
			case 'css' : return 'text/css'
			case 'json' : return 'application/json'
			case 'js' : return 'application/javascript'
			default : return 'text/html'
		}
	}

	get read () {

		const path = this.url === '/' ? './public/index.html' : '.' + this.url

		fs.readFile(path, (err, readFile) => {
			if(err) return console.error('파일 읽기 실패 : ', path)
			
			this.res.writeHead(200, { 'Content-Type' : this.fileContentType() })
			this.res.end(readFile)
		})
	}

}

// const fileReader = (res, url) => {

// 	if(url === '/') {
// 		fs.readFile('./public/index.html', (err, readFile) => {
// 		if(err) return console.error('index.html 불러오기 실패')
			
// 			res.writeHead(200, { 'Content-Type' : 'text/html' })
// 			res.end(readFile)
// 		})
// 		return
// 	}

// 	const extender = url.split('.')[1]
// 	const fileContentType = extractContentType(extender)
// 	const path = "."+url 
// 	// console.log('url : ', url)
// 	// console.log('타입 : ', fileContentType)
// 	fs.readFile(path, (err, readFile) => {
// 		if(err) return console.error('파일 읽기 실패 : ', path)
		
// 		res.writeHead(200, { 'Content-Type' : fileContentType })
// 		res.end(readFile)
// 	})
// }
	
// function extractContentType (extender) {
// 	switch(extender) {
// 		case 'html' : return 'text/html'
// 		case 'css' : return 'text/css'
// 		case 'json' : return 'application/json'
// 		case 'js' : return 'application/javascript'
// 	}
// }

export default FileReader