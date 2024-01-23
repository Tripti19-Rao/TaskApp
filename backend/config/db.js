const mongoose = require('mongoose')


const configureDB = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/taskapp-assignment')
    .then(()=>{
        console.log("Connected to db")
    })
    .catch(()=>{
        console.log('Error connecting to db')
    })

}

module.exports = configureDB