// src/components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    // localStorage.removeItem('user');
    dispatch(clearUser());
    console.log("User data is clear.");
    navigate('/login')
  };

  return (
    <div className='logout-btn'>
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton;
