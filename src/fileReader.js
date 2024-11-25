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
		this._url = url
	}

	get url () {
		return this._url
	}

	set url (value) {
		if(typeof (value) === 'string'){
			this._url = value
		} else {
			console.error('url은 문자열만 사용 가능합니다.')

		}
	}

	get extender() {
		return this._url.split('.').pop()
	}
	
	get fileContentType () {
		switch(this.extender) {
			case 'html' : return 'text/html'
			case 'css' : return 'text/css'
			case 'json' : return 'application/json'
			case 'js' : return 'application/javascript'
			default : return 'text/html'
		}
	}

	get read () {

		const path = this._url === '/' ? './public/index.html' : '.' + this._url

		fs.readFile(path, (err, readFile) => {
			if(err) {
				fs.readFile('./public/notFound.html', (err, notFoundFile) => {
					if(err) return console.error('서버 에러')
					this.res.writeHead(404, { 'Content-Type': 'text/html; charset=utf8' })
					this.res.end(notFoundFile)
				})
				return console.error('파일 읽기 실패 : ', path)
			}
			
			this.res.writeHead(200, { 'Content-Type' : this.fileContentType })
			this.res.end(readFile)
		})
	}

}

export default FileReader