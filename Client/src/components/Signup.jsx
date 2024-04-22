import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
    
  async function handleUserSignup(){

    try{
      const response = await axios.post('/api/user', {
        name,
        email,
        password,
      })
      console.log(response.data.message);
    }catch(err){

    }

  }

  return (
    <div className="register-container">
      <h1>SignUp</h1>
    <form action="/user" method="post">
        <label>Full Name : </label>
        <input type="text" required name="name" value={name} onChange={(e) => setName(e.target.value) }/>
        <label>Email : </label>
        <input type="text" required name="email" value={email} onChange={(e) => setEmail(e.target.value) }/>
        <label>Password : </label>
        <input type="text" required name="password" value={password} onChange={(e) => setPassword(e.target.value) }/>

        <button type="submit" onClick={handleUserSignup}>Signup</button>
    </form>
    <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup
