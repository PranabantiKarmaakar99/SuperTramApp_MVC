import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from './AuthContext';
import axios from 'axios';
import { MdAccountCircle, MdChatBubble } from 'react-icons/md';
import { FaBook, FaMap, FaMapPin,FaUsers } from 'react-icons/fa';
import IMG from  '../public/image/1.jpg'

const Navbar = () => {
  const { user, signout } = useAuth();
  const [roles, setRoles] = useState([]);
  const user1 = localStorage.getItem('user');
  
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('https://localhost:7058/api/User/roles', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
        setRoles(response.data);  // Update roles state with data from the API
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    if (user1) {
      fetchUserRoles();
    }
  }, [user1]);

  return (
    <div >
      {/* Top Navbar for Desktop */}
      <div className="hidden md:flex h-20 justify-between items-center bg-white p-4">
      
        <Link to='/' className='text-lg' > <img className="w-32 md:w-48 lg:w-64 h-auto" src={IMG} alt='SuperTram' /> </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-black">Explore</Link>
          <Link to="/plan" className="text-black">Plan</Link>
          <Link to="/community" className="text-black">Community</Link>
          <Link to="/map" className="text-black">Map</Link>
          {user1 ? (<Link to="/account" className="text-black">Account</Link>): null}
          {user1 && <Link to="/ticket" className="text-black">Your Ticket</Link>}
          {roles.includes('Admin') && <Link to="/admin/users" className="text-black">See Users</Link>} {/* Admin-specific link */}
        </div>
        {user1 ? (
          <div className="flex space-x-4 items-center">
            <span className="text-black">{user1}</span>
            <button onClick={signout} className="text-red-500">Signout</button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/signin" className="text-black">Sign In</Link>
            <Link to="/signup" className="text-black">Sign Up</Link>
          </div>
        )}



      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="md:hidden fixed bottom-0 w-full bg-white shadow-lg flex justify-around p-2">
    
        <Link to="/" className="flex flex-col items-center">
          <FaMap size={24} />
          <span className="text-sm">Explore</span>
        </Link>
        <Link to="/plan" className="flex flex-col items-center">
          <FaMapPin size={24} />
          <span className="text-sm">Plan</span>
        </Link>
        {roles.includes('Admin') ? (
          <Link to="/admin/users" className="flex flex-col items-center">
            <FaUsers size={24} />
            <span className="text-sm">See Users</span>
          </Link>
        ) : (
          <Link to="/community" className="flex flex-col items-center">
            <MdChatBubble size={24} />
            <span className="text-sm">Community</span>
          </Link>
        )}
       
       
          <Link to="/map" className="flex flex-col items-center">
            <FaBook size={24} />
            <span className="text-sm">Map</span>
          </Link>
        
        {user1 ? (
          <Link to="/account" className="flex flex-col items-center">
            <MdAccountCircle size={24} />
            <span className="text-sm">Account</span>
          </Link>
        ) : null}
      </div>

      {/* Top Navbar for Mobile */}
      <div className="md:hidden fixed top-0 w-full bg-white p-4 flex justify-between items-center">
     
      
        <Link className="text-blue-600 text-2xl w-1/2 font-bold" to='/'>
          <img src={IMG} alt='SuperTram' />
          
          </Link>
        {user1 ? (
          <div className="flex w-1/2 space-x-4 flex-col items-center">
            <span className="text-blue-600 text-sm">{user1}</span>
            <button onClick={signout} className="text-blue-600">Signout</button>
          </div>
        ) : (
          <div className="flex w-1/2 items-center space-x-4">
            <Link to="/signin" className="text-blue-600 px-4">Sign In</Link> |
            <Link to="/signup" className="text-blue-600">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;



