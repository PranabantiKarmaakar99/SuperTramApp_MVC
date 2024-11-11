
import React from 'react';
import BoughtTicket from './BoughtTicket';
import { useAuth } from './AuthContext'; // If you are using context to get user data
import { useLocation } from 'react-router-dom';

const Wallet = () => {
  
  const location = useLocation();
  const cart = location.state?.cart || []; // Ensure cart data is retrieved correctly
  const user1 = localStorage.getItem('user');

  return (
    <div>
      <h1>Your Wallet</h1>
      <BoughtTicket user={user1} cart={cart} />
    </div>
  );
};

export default Wallet;
