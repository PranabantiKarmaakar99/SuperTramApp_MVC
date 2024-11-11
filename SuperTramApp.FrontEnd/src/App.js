
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectTickets from './Component/SelectTickets.js';
import SelectPasses from './Component/SelectPasses.js';

import Ticket from './Component/Ticket.js';
import Navbar from './Component/Navbar.js';
import Login from './Component/Login.js';
import Register from './Component/Register.js';
import Logout from './Component/Logout.js';
import Landing_Page from './Component/LandingPage.js';
import  {Cart}  from './Component/Cart.js';
import { AuthProvider } from './Component/AuthContext';

import OrderSummary1 from './Component/StripePayment.js';
import AdminComponent from './Component/Admin.js';
import Community from './Component/Community2.js';
import MapPage from './pages/MapPage.js'
import FavouritesComponent from './Component/FavouritesComponent.js'



import BoughtTicket from './Component/BoughtTicket.js';
import Account from './Component/Accounts.js';

import JourneyPlannerComponent from './Component/JourneyPlannerComponent.js';



export default function App () {
  return (
   
    <Router>
       <AuthProvider>
       <div className="flex flex-col min-h-screen">
        <Navbar />
       
        <div className="flex-grow">
       <Routes>
       
     
        <Route path="/" element={<Landing_Page />} />
        <Route path="select-tickets" element={<SelectTickets />} />
        <Route path="select-passes" element={<SelectPasses />} />
        <Route path="ticket" element={<Ticket/>} />
        <Route path="signin" element={<Login/>} />
        <Route path="signup" element={<Register/>} />
        <Route path="signout" element ={<Logout/>} />
        <Route path="wallet" element={<BoughtTicket />} />
        <Route path="cart"  element={<Cart/>} />
        <Route path="checkout" element={<OrderSummary1/>} />
        <Route path="account" element={<Account/>} />
        <Route path="admin" element={<AdminComponent/>} />
        <Route path="plan" element ={<JourneyPlannerComponent/>} />
        <Route path="community" element={<Community/>} />
        <Route path="/map" element={<MapPage />} /> 
        <Route path="/favourites" element={<FavouritesComponent />} />

     

        </Routes>
        </div>
        </div>
        </AuthProvider >
    </Router>
   
  );
};


