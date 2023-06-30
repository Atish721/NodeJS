const EventEmitter = require('events')

const event = new EventEmitter()

event.on('MyOwnEvent',()=>{
    console.log('Welcome to the my World.')
})


event.on('MyOwnEvent',()=>{
    console.log('Welcome to the my Node JS World.')
})

event.on('MyOwnEventParam',(statusCode,message)=>{
    console.log(`Status code is ${statusCode} and message is ${message}`)
})

event.emit('MyOwnEvent')

event.emit('MyOwnEventParam',200,'Okay')