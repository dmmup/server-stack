const mongoose = require('mongoose')

var shema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    matricule:{
        type:String,
        require:true,
        unique:true
    },
    password:String
})

const Userdb = mongoose.model('user',shema)

module.exports=Userdb;