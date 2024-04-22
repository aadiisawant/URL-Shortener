// import axios from 'axios';
import React, { useState } from 'react'
import './Login.css'
import { Link,  useNavigate } from "react-router-dom";

function Login({setUser}) {

  const navigate =  useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState({
  //   name:"",
  //   _id:""
  // })
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

  console.log(data);
  if (res.status === 200) {
    console.log(data.name);
    setUser({
      name : data.name,
      _id : data._id
    })
    navigate('/home');
  } 
  else if(res.status === 404){
    console.log(data.message);
  }
  else {
    // Handle errors 
    console.log("Error : Internal Server Error");
  }

  //axios //Error is shown with axios
    // const response = await axios.post('/api/user/login',{
    //   email,
    //   password,
    // })
    // console.log(response.message);
  //   console.log("Error :",response.data.message);
  //   // response { userId : xyz}
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
