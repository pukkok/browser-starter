const root = document.getElementById('root')
import data from "./user.json" with { type: "json" }
import testData from "../public/test.js"

function card () {
  const students = data.students
  const components = students.map(student => {
    const {prefixName, type, uuid, name} = student
    const component = 
    `
    <div class="card">
      <h3>${prefixName}</h3>
      <p>${type === 'new' ? '뉴비' : '고인물'}</p>
      <p>고유ID : ${uuid}</p>
      <p>이름 : ${name}</p>
    </div>
    `
    return component
  })

  root.innerHTML = `
    <h1>KDT반 학생 목록 생성</h1>
    <div class="wrapper">
      ${components.join('\n')}
    <div>
  `
}

card()

console.log(testData)
console.log('app.js 동작 완료')