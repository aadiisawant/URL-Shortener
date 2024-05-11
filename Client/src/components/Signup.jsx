import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleUserSignup(event){
    
    event.preventDefault();
    console.log("In handleUserSignup");
    try{

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      
      const res = await axios.post('/api/user', formData,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({name, email, password})
      })
      // const response = await res.json();
      console.log(res);
      console.log(res.status);
      if (res.status === 201) {
        console.log(res);
        dispatch(setUser({
          name : res.data.name,
          _id : res.data._id
        }))
        alert("User Registration is successful.")
        navigate('/home');
      } 
      else if(res.status === 404){
        console.log(res.message);
      }
    }catch(err){
      console.log("Error in Signup snippet: ",err);
    }

  }

  return (
    <div className="register-container">
      <h1>SignUp</h1>
    <form onSubmit={handleUserSignup}>
        <label>Full Name : </label>
        <input type="text" required name="name" value={name} onChange={(e) => setName(e.target.value) }/>
        <label>Email : </label>
        <input type="text" required name="email" value={email} onChange={(e) => setEmail(e.target.value) }/>
        <label>Password : </label>
        <input type="text" required name="password" value={password} onChange={(e) => setPassword(e.target.value) }/>

        {/* <button type="submit" onClick={handleUserSignup}>Signup</button> */}
        <button type="submit" >Signup</button>
    </form>
    <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup
