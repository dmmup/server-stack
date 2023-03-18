import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';



const Login = (navigation) => {
  const [mat, setMat] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const onSendToLogin = () => {
    navigate('/register')
  }


  const onConnect = async (e) =>{
    e.preventDefault();
    
    try{
      const url = 'http://localhost:5000/auth'
      const body = {
        "matricule": `${mat}`,
        "password": `${pwd}`
      }      
       const {data} = await axios.post(url, body);
       if (data.sucess === true){
        sessionStorage.setItem("matricule", data.data[0].matricule);
        sessionStorage.setItem("name", data.data[0].name);
        console.log(data.data[0].name)
        navigate(`/questions`)
      }else{
        alert(data.error + "  Matricule ou Password incorrect!!!")
        
      }
       setMat('');
       setPwd('');
       
    }catch (error) {
	console.error(error);
}
}

  
 

      
  return (
    <div className='container'>
      <div className='containeur shadow-lg p-3 mb-5  rounded'>
        <h1>Login</h1>
    <form method="post">
        <div className="mb-3 mt-3 ">
            <label htmlFor="matricule" className="form-label">Matricule</label>
            <input type="text" className="form-control"  value={mat} onChange={(e) => setMat(e.target.value)}/>
            
        </div>
        <div className="mb-3  mt-5">
                <label htmlFor="pwd" className="form-label">Password</label>
                <input type="password" className="form-control" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </div>
        
        <button type="submit" onClick={onConnect}  className="btn btn-primary btn-lg btn-light">Login</button>
        
    </form>
    <div className="register" onClick={onSendToLogin}>Nouveau client ? M'inscrire</div>
    </div>
    </div>
  )
}

export default Login