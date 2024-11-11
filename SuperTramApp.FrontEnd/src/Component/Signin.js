// Signin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Signin = () => {
    const { signin,user,signout } = useAuth(); // Use the hook inside the component
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7058/api/auth/login', { username, password });
            const tokenResponse = response.data;

            // Store tokens in localStorage
            localStorage.setItem('accessToken', tokenResponse.accessToken);
            localStorage.setItem('refreshToken', tokenResponse.refreshToken);

            // Call signin to update the user context
            signin(tokenResponse);
            
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Signin;
