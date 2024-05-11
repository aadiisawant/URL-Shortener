import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import LogoutButton from './LogoutButton';
import './Home.css'

function Home() {

  //user from store
  const user = useSelector(selectUser);
  const [originalUrl, setOriinalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("User object:", user);
    if (user && user._id) {
      console.log("User ID:", user._id);
      handleUserUrls(user._id);
    }
  }, [user]);
  
  async function handleUserUrls(id){
    try{
    //fetch
    console.log("IN home handleuserurls block");
    const res = await fetch(`/api/url/${id}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
 
    const data = await res.json();
  
    console.log(data);

    if (res.status === 200) {
      setUrls(data)
    } 
    else if(res.status === 404){
      console.log(data.message);
    }
    else { 
      console.log("Error : Internal Server Error");
    }
    }catch(err){
      console.log("Error : ",err);
    }
  }

  useEffect(()=>{
    if(user &&  user._id)
    handleUserUrls(user._id);
  }, [user])


  async function handleCreateShortUrl(event){
    event.preventDefault();
    try{
    console.log("In handleCreateShortUrl block");
    const res = await fetch('/api/url', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({url:originalUrl , id:user._id})
    })

    const data = await res.json();
    
    if(res.status === 400){
      console.log("Error:"+data.error);
    }
    else if(res.status === 201){
      //Updated list of urls after creation of new shortUrl
      const updatedUrlsRes = await fetch(`/api/url/${user._id}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      })
      const updatedUrlsData = await updatedUrlsRes.json();
      console.log("Data from updated list:",updatedUrlsData);
      setUrls(updatedUrlsData)
    }else{
      console.log("Error occured in backend");
    }
  }catch(err){
    console.log("Error:",err);
  }
  }

  async function handleRedirectURL(shortID) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found.');
      return;
    }
  
    try {
      //have to allow cors 
      const response = await fetch(`/api/url/redirect/${shortID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin':"*"
        }
      });
  
      if (response.ok) {
        // If the response is successful, the page should redirect automatically
        console.log('Redirected successfully.');
      } else {
        console.error('Failed to redirect:', response.statusText);
      }
    } catch (error) {
      console.error('Error during redirection:', error);
    }
  }
  
  return (
    <div>
      <nav className="navbar">
        <div className="user-info">
          <span>Welcome, {user && user.name}</span>
        </div>
        <LogoutButton />
      </nav>
      <h1>URL Shortener</h1>
      <div className="container">
        <h4>Paste the URL to be shortened</h4>
        <form>
          <label htmlFor="urlInput">Enter the Original Link</label>
          <input id="urlInput" name="url" value={originalUrl} onChange={(e) => setOriinalUrl(e.target.value)} type="text" placeholder="https://example.com" />
          <button type="submit" onClick={handleCreateShortUrl}>Generate</button>
        </form>
      </div>
      {urls && urls.length > 0 ? (
  <div>
    <table>
      <thead>
        <tr>
          <th>S. No</th>
          <th>ShortID</th>
          <th>Redirect-URL</th>
          <th>Clicks</th>
          <th>Redirect</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{url.shortID}</td>
            <td>{url.redirectURL}</td>
            <td>{url.vistHistory.length}</td>
            <td>
              {/* <a href="http://"></a> */}
              <button onClick={() => handleRedirectURL(url.shortID)}>Redirect</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No URLs found.</p>
)}

    </div>
  )
}

export default Home
