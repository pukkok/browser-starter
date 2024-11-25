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

export default Template
