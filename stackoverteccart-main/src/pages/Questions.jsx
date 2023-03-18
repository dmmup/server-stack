import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import icon_comment from '../images/comment-icon.png'
import icon_eye from '../images/icon-eye.png'
import icon_user from '../images/user.png'
import icon_trash from '../images/trash.png'
import Sidebar from './Sidebar';




const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [uneQuestion, setUnequestions] = useState('')
  const {token} = useParams()
  const navigate= useNavigate()

    const url = `http://localhost:5000/question`;
    
    const laQues = (e) => {
      e.preventDefault();
      var uneQuestion = e.target.value;
      setUnequestions(uneQuestion);
    }
    
    const onSendQuestion = async() => {
      
      const mat = sessionStorage.getItem("matricule")
      const name = sessionStorage.getItem("name")
        const body = {
          "newQuestion" : uneQuestion,
          "name": name,
          "matricule" : mat
        }
        console.log(body)
        const {data} = await axios.post(url,body);
        
        if (data.sucess){
          setQuestions(data.data)
          console.log(data.data)
          setUnequestions('')
        }
        
    }

    const onAnswer = (id) => {
      sessionStorage.setItem("id_question", id);
      // rediriger avec navigate vers answer.jsx
      navigate(`/question`)
      // ajoute route dans app
      

    }
    
    const initials = (nom) => {
      
      var parts = nom.split(' ')
      var ini = ''
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          ini += parts[i][0]
        }
      }
      return ini.toUpperCase();
          
    }

    
    const onDeleteQuestion = async (id) => {
      const url2 = `http://localhost:5000/question/delete/${id}`;
      const matricule = sessionStorage.getItem("matricule")
      const body = {
        matricule
      }
      const {data} = await axios.post(url2,body);


      if (data.sucess){
        
        window.location.reload(false);
        alert(data.msg)
      }else{
        alert(data.msg)
      }
    }
         
    const showData = () => {
      return questions.map((question) => 
      
      <div className='show-question-container'>
          <div className='show-question-question' key={question._id} onClick={() =>onAnswer(question._id)}>
            {question.newQuestion}
          </div>
          <div className='answer-question-section'>
            <div className='answer-question'>
            <img src={icon_comment} alt="" onClick={() =>onAnswer(question._id)} />
            <div className="stat-question">{question.answer.length}</div>
            <img src={icon_user} alt="" />
            <div className="stat-question">{initials(question.name)}</div>
            <img src={icon_trash} alt="" onClick={() =>onDeleteQuestion(question._id)}/>
            
          </div>

          </div>
        
      </div>  
        
        )}

    useEffect(() => {
      const getData = async() => {
        const {data} = await axios.get(url);
        if(data.sucess){
          
          setQuestions(data.data)
          
          
        }
    }
        getData();
    }, [questions])

  return (
    <div >
      <div className='profil'>
      <img className='pic_profil' src={icon_user} alt="" />Bienvenue, {sessionStorage.getItem("name")}
      </div>
      <Sidebar/>
<div className='container-question'>
      <div className='askQ'> 
      <input type="text"  className='put' placeholder='Vous avez une question? Poser la ici ...' onChange={laQues} required/>
      <button type="button" className='btn btn-primary'  onClick={onSendQuestion} > Ajouter </button>
      
      </div>
      <div className="divider"></div>
      <div>{showData()} </div>
    </div>
    </div>
    // onClick={() =>onSendQuestion()}
    
  )
}

export default Questions