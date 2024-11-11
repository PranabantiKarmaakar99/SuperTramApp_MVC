import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';



const API_URL = 'https://localhost:7058/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', {
    email,
    password
  }).then(response => response.data); // Removed JSON.stringify() as it's not needed
};

const login = (email, password) => {

  
  
  return axios.post(API_URL + 'login', {
    email,
    password
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      
    }
    console.log(response.data);
    const tokenResponse = response.data;
 
    localStorage.setItem('accessToken', tokenResponse.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);
    console.log("I am here");
   
   

    
    
   
   

    
    console.log("I am here2");
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};

