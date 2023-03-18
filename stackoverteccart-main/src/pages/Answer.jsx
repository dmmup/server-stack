import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';



const Answer = () => {
    const [laQuestion, setLaquestion] = useState([]);
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate();
    const id_Q = sessionStorage.getItem('id_question')
    const [reponsesFromDB, setReponseFromDB] = useState([]);
    const [rep, setRep] = useState('')

    
    

    const onSubmit = async () =>{
        const matricule = sessionStorage.getItem("matricule")
        const name = sessionStorage.getItem("name")
        const url = `http://localhost:5000/question/create-answer/${id_Q}`; 
        const body = {
          "matricule": matricule,
          "name": name,
          "text" : rep
        }
        const repToDb = await axios.post(url,body);
        if(repToDb.sucess){
          setReponseFromDB(repToDb.data.answer)
          
        }
        

        
    }
    
     var getInitials = (name) => {
      var parts = name.split(' ')
      var initials = ''
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          initials += parts[i][0]
        }
      }
      return initials
    }

     const repFromUser = (e) => {
      var r = e.target.value;
          setRep(r);
          
     }

    const showAnswers = () => {
      return reponsesFromDB.map((element) => {
         return <div className='answer-container' key={element._id} >
          <div className="answer-title">
              <div className="round-init">{getInitials(element.name)}</div>
              <div className="title-name">{element.name}</div>
          </div>
          <div className="answer">{element.text}</div>
         </div>
         
        });
    }
    useEffect(() => {
      const getData = async() => {
        
        const url =`http://localhost:5000/question/create-answer/${id_Q}`
        
          const {data} = await axios.get(url);
          if(data.sucess){
            
            setLaquestion(data.data.newQuestion)            
            setReponseFromDB(data.data.answer)
            
          }
      }
        getData();
    }, [reponsesFromDB])

  return (
    <div className='container'>
      <Sidebar/>
      <div className="container-question">
      <h1 className='mt-5'>{laQuestion}</h1>
      <div className='askQ'> 
      <input type="text" className='put' placeholder='Vous avez la reponse a cette question? Repondez ici ...' required onChange={repFromUser}/>
      <button type="button" className='btn btn-primary ml-3' onClick={onSubmit} >Repondre</button>
      </div>
      <div>{showAnswers()}</div>
      </div>
      
    </div>
  )
}

export default Answer