const path = require('path')

console.log(`dirname : ${path.dirname('/var/www/html/NodeJs/PathModule/index.js')}`)
console.log(`extension name : ${path.extname('/var/www/html/NodeJs/PathModule/index.js')}`)
console.log(`base name : ${path.basename('/var/www/html/NodeJs/PathModule/index.js')}`)

const parse = path.parse('/var/www/html/NodeJs/PathModule/index.js')

console.log(`parse : ${parse}`)