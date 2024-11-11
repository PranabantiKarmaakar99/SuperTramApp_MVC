import React, { useState } from 'react';
import authService from './Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';


const Login = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
 
  let cart = localStorage.getItem('cart');

  console.log('cart',cart)
 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7058/login', {email, password });
            const tokenResponse = response.data;

            // Store tokens in localStorage
            localStorage.setItem('accessToken', tokenResponse.accessToken);
            localStorage.setItem('refreshToken', tokenResponse.refreshToken);

            // Call signin to update the user context
           
            console.log("I am logged in")
            const userResponse = await axios.get('https://localhost:7058/user', {
              headers: {
                Authorization:  'Bearer ' + localStorage.getItem('accessToken'),
              },
            });
            console.log("userResponse", userResponse.data)
            // Store user data in localStorage
            localStorage.setItem('user', userResponse.data);
            setUser(userResponse.data);
            signin(userResponse.data);
            console.log('user ',user);
       
        
            navigate('/')
            
           
    } catch (error) {
      console.log(error)
      setMessage('invalid credentials');
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login;

