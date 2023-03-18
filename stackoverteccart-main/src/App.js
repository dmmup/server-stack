
import './App.css';
// import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Register from './pages/Register';
import Login from './pages/Login';
import Register from './pages/Register';
import Questions from './pages/Questions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Answer from './pages/Answer';


function App()  {

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/questions' element={<Questions/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/question' element={<Answer/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
