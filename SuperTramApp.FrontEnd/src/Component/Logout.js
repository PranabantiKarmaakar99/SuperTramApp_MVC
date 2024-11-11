import React, { useEffect } from 'react';
import authService from './Auth'; // Make sure this path is correct based on your project structure
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    
    navigate('/login');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
