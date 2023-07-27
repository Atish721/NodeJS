const mongoose = require('mongoose')

async function connectDB() {
    try {
        mongoose.set('strict',false)
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Db connected : ${connect.connection.host}`)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = connectDB