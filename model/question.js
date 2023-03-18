const mongoose = require('mongoose')

var question = new mongoose.Schema({
    newQuestion:{
        type:String,
        require:true
    },
    name: {
        type: String,
        require: true
    },
    matricule: {
        type: String,
        require: true
    },
    answer: [{
        matricule: {
            type: String
        },
        name: {
            type: String
        },
        text: {
            type: String,
        }
    }],
    isAlive: {
        type: Boolean,
        default: true
    }

})

const Questiondb = mongoose.model('Question', question)

module.exports=Questiondb;