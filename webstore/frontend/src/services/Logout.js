import React from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import errorHandler from './errorHandler';
async function getLogout() {
  try {
    const {data} = await axios.get('http://localhost:8000/api/users/logout/')
  } catch (error) {
    errorHandler(error);
  }
}


export function Logout({setAuthState , navigate}) {

    localStorage.removeItem("loggedUser")
    // const navigate=useNavigate();
    // navigate('/')
    getLogout()
    const logoutObj = {
      headers: null,
      isAuth: false,
      loggedUser: {
        email: "",
        id: null,
        username: "",
      }
    };
    setAuthState(logoutObj);
    navigate('/shop/')
    return;
}
