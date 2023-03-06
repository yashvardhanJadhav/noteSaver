const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/NoteApp'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connection made sucessfully")
    })
}

module.exports = connectToMongo;