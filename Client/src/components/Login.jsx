// import axios from 'axios';
import React, { useState } from 'react'
import './Login.css'
import { Link,  useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

//removed {setUser}
function Login() {

  const navigate =  useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //redux
  const dispatch = useDispatch();

async function handleUserLogin(){

  //fetch
  console.log("IN login block");
  const res = await fetch('/api/user/login', { // Your API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  // .then((resp) => { return resp.json()})

  const data = await res.json();
  //jwt update
  const user = data.user;
  console.log(data);
  if (res.status === 200) {
    console.log(user.name); //jwt
    localStorage.setItem("token", data.token)
    //redux update
    dispatch(setUser({
      name : user.name, //jwt
      _id : user._id
    }))
    navigate('/home');
  } 
  else if(res.status === 404){
    alert(data.message)
    console.log(data.message);
  }
  else {
    // Handle errors 
    console.log("Error : Internal Server Error");
  }

}


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleUserLogin}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default Login
