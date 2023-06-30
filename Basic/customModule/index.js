const operatorModule = require('./operatorModule')
let addtion = operatorModule.add(5, 5)
let substraction = operatorModule.sub(55, 5)
let name = operatorModule.name
console.log(`Addtion : ${addtion}`)
console.log(`Substraction : ${substraction}`)
console.log(`Name : ${name}`)