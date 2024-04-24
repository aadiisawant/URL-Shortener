
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
// import { useState } from 'react';

function App() {

  // const [user, setUser] = useState({})
  // setUser={setUser} login/signup
  //user={user} home
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        </Routes>
      </Router>

    </>
  
  )
}

export default App
