import React from 'react'
import { useNavigate } from 'react-router-dom'
function LogoutScreen() {
    const navigate=useNavigate();
    navigate('/')
  return (
    <div>Logged out. Redirecting...</div>
  )
  
}

export default LogoutScreen