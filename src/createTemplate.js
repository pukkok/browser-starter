/**
 * @description 
 * root를 가진 html파일로 생성
 * 작동 확인을 하기 위해 "html 실행 확인"을 브라우저에 띄움
 */
class Template {
  constructor( title ){
    this.title = title 
  }
  
  space = "  "

  #cssLink = `<link rel="stylesheet" href="./public/style.css">`
  #jsScript = `<script type="module" src="./public/app.js"></script>`
  #DOCTYPE = `<!DOCTYPE html>`
  #body = 
  "<body>" + "\n" +
  this.space + `<div id="root">html 실행 확인</div>` + "\n" +
  this.space + this.#jsScript + "\n" +
  "</body>"

  #getHead () {
    return (
      "<head>" + "\n" +
      this.space + '<meta charset="UTF-8">' + "\n" +
      this.space + '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + "\n" +
      this.space + `<title>${this.title}</title>` + "\n" +
      this.space + `<link rel="icon" href="data:,">` +
      this.space + this.#cssLink + "\n" +
      "</head>" + "\n"
    )
  }

  #getHTML () {
    return (
      '<html lang="ko">' + "\n" + 
      this.#getHead() + this.#body + "\n" + 
      "</html>"
    )
  } 
  
  get render () {
    return (
      this.#DOCTYPE + "\n" +
      this.#getHTML()
    )
  }
}

export default Template
