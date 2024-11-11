// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const user1 = localStorage.getItem('user');
    const signin = () => {
      
        console.log("user: ",user)
        setUser(user1);
        console.log("user: ",user1)



    }

    const signout = (tokenResponse) => {
        console.log(tokenResponse.accesToken)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        localStorage.removeItem('cart');
        //console.log(accesToken)
        setUser();
        navigate('/')
    };

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};



