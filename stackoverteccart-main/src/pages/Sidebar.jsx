import React from 'react'
import home_icon from '../images/icon-home.png';
import signout from '../images/icon-sign-out.png'
import { useNavigate, useParams } from 'react-router-dom';

const Sidebar = () => {
  const navigate= useNavigate()

  const onSendToMainPage = () => {
    console.log("Voila!!!")
    navigate(`/questions`)
  }
  const onSignOut = () => {
    sessionStorage.setItem("matricule", '');
    sessionStorage.setItem("name", '');
    navigate(`/`)
  }
  return (
    <div className='sidebar'>
        <img src={home_icon} alt="" onClick={onSendToMainPage}/>
        <div className="column">
            <div className="divider" ></div>
            <img src={signout} alt="" onClick={onSignOut}/>
        </div>
    </div>
  )
}

export default Sidebar