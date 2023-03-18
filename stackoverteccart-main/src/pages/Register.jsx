import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [mat, setMat] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd1, setPwd1] = useState('');
    const [fName, setFname] = useState('');
    const navigate = useNavigate();

    


    const onSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:5000/user'
        const body = {
            "name": `${fName}`,
            "matricule": `${mat}`,
            "password": `${pwd}`
        }
        if(pwd == pwd1){
            const {data} = await axios.post(url, body);
            console.log(data);
            if(data.sucess == true){
                navigate('/')
            }
            else{
                alert(`${data.msg}`)
            }
        }else{
            alert('Assurez vous que les mot de passe sont identique !!!')
        }
        
    }

  return (
    <div className='container'>
        <h1>Page d'inscription</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3 mt-3 col-md-6">
                <label for="exampleInputEmail1" className="form-label">Matricule</label>
                <input type="text" className="form-control" value={mat} onChange={(e) => setMat(e.target.value)}/>
                
            </div>
            <div className="mb-3 col-md-6">
                <label for="exampleInputEmail1" className="form-label">Votre Nom Complet</label>
                <input type="text" className="form-control" value={fName} onChange={(e) => setFname(e.target.value)}/>
                
            </div>
            <div className="mb-3 col-md-6 mt-5">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </div>
            <div className="mb-3 col-md-6">
                <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={pwd1} onChange={(e) => setPwd1(e.target.value)} />
            </div>
            
            <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
    </div>
  )
}

export default Register