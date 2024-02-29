const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const User = require('./model/shema')
const Question = require('./model/question')
const bodyParser = require('body-parser')
const { ObjectId } = require("mongodb")


app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));


const ConnectDB = async () => {
  const url = 'mongodb+srv://dmup:zagadat@cluster0.y7nxklk.mongodb.net/?retryWrites=true&w=majority' 


  try {
    const con = await mongoose.connect(url)
    console.log("Connected to DB")
  } catch (e) {
    console.error(e)
  } 
  
}

ConnectDB().catch(console.error);


app.post("/user", async (req, res) => {
  const {name, matricule, password} = req.body;
  
    const user = await User.create(req.body)

    res.send({
      'sucess' : true,
      'data': user,
      'msg': 'User inserted succefully!!!'
    })
    
})

app.post('/auth', async (req, res) => {
  const {matricule, password} = req.body;
  

  try {
    const user = await User.find({ matricule, password }).select('_id name matricule')
    if (user.length === 0) {
      res.send({
        'sucess': false,
        'msg': "Login not successful",
        'error': 'User not found'
      })
      console.log(user)
      
    } else {
      res.send({
        'sucess': true,
        'msg': "Login successful",
        'data': user
      })
      console.log(user)
    }
  } catch (error) {
    res.status(400).send({
      'sucess': false,
      'msg': "An error occurred",
      'error': error.message
    })
    
  }
  
  
})

app.post('/question', async (req, res) => {
  const {newQuestion, name, matricule} = req.body;
  
  const uneQuestion = await Question.create(req.body)
  console.log(uneQuestion)
})

app.get('/question', async (req, res) => {
  try {
    const questions = await Question.find({ isAlive: true})

    res.send({
      'sucess': true,
      'data': questions
    })
    
    
  } catch (error) {
    res.status(400).send({
      'sucess': false,
      'msg': "An error occurred",
      'error': error.message
    })
  }
})

app.get('/question/create-answer/:id', async (req, res) => {
  const {id} = req.params;
  const conditions = { _id: id}
  
  try {
    const laQuestion = await Question.findById(id)
    res.send({
      'sucess': true,
      'data': laQuestion
    })

  } catch (error) {
    res.status(400).send({
      'sucess': false,
      'msg': "An error occurred",
      'error': error.message
    })
  }

  
  
})

app.post('/question/create-answer/:id', async (req, res) => {
  const {id} = req.params;
  const {matricule, name, text} = req.body;
  console.log(req.body)
  
  try {

    const laQuestion = await Question.findById(id)
    
    laQuestion.answer.push({
      matricule,
      name,
      text
    })
    await laQuestion.save()
    console.log(laQuestion)
    res.send({
      'sucess': true,
      'data': laQuestion
    })

  } catch (error) {
    res.status(400).send({
      'sucess': false,
      'msg': "An error occurred",
      'error': error.message
    })
  }

  
  
})
app.post('/question/delete/:id', async (req, res) => {
  const {id} = req.params;
  const {matricule} = req.body
  
  try {

    const laQuestion = await Question.findById(id)
    
    if (laQuestion.matricule === matricule){
      const q = await Question.updateOne(
        { _id: id },
        {
          $set: { isAlive : false},
          $currentDate: { lastModified: true }
        }
     )
        if (q.acknowledged){
            res.send({
                'sucess': true,
                'msg': "Supprimer avec succes!"
            })
        }
  
      console.log(q)
    }else{
      console.log(laQuestion + " vous n'etes pas l'auteur")
      res.send({
        'sucess': false,
        'msg': "Vous n'etes pas l'auteur de cette question!"
    })
    }
    

  } catch (error) {
    res.status(400).send({
      'sucess': false,
      'msg': "An error occurred",
      'error': error.message
    })
  }
})

app.listen(5000, () => {console.log("Server started on port 5000")})