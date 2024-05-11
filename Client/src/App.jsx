
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        </Routes>
      </Router>

    </>
  
  )
}

export default App
