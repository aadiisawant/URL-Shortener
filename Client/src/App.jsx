
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({})
  
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Login setUser={setUser}/>} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home user={user}/>} />
        </Routes>
      </Router>

    </>
  
  )
}

export default App
