import React, { useState } from 'react';
import axios from 'axios';
import TicketCard from './Ticket';
import { useNavigate } from 'react-router-dom';

const SelectPasses = () => {

  const [travellerType, setTravellerType] = useState('adult');
  const [duration, setDuration] = useState('oneday');
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic
 
    const passDetails = {
      duration,
      travellerType
      
    };

    try {
      const response = await axios.post('https://localhost:7058/api/Ticket/get-pass-details', passDetails, {headers: {
        'Content-Type': 'application/json' 
    }}
       
      );

      if (response.status === 200) {
        console.log('Ticket details:', response.data);
        localStorage.setItem('ticket',response.data)
        navigate('/ticket', { state: { ticket: response.data } });
        // Handle successful response
      } else {
        console.error('Failed to fetch ticket details');
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };


  return (
    <div className="bg-white flex flex-row justify-center w-full md:mt-0 mt-[65px]">
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white overflow-hidden w-full h-[800px] relative">
        <div className="absolute w-full h-[800px] top-0 left-0">
          
          {/* Background for larger devices */}
          <div className="w-full h-[800px] bg-[#d9d9d9] absolute z-10 hidden md:block"></div>
  
          {/* Container for the form */}
          <div className="relative md:absolute md:top-16 md:left-[100px] w-[430px] md:w-[407px] h-[932px] md:h-[600px] bg-white rounded-[10px] overflow-hidden z-20 shadow-lg">
            
            {/* Tickets Title */}
            <div className="absolute top-[63px] md:top-[70px] left-[36px] md:left-[50px] font-semibold text-black text-xl">
              Passes
            </div>
            
            {/* Zone Label and Select */}
            <div className="absolute top-[125px] md:top-[120px] left-[36px] md:left-[50px]">
              <label className="font-semibold text-black text-xl">
                Traveller Type
              </label>
              <div className="flex w-[242px] items-center mt-2 rounded-lg overflow-hidden border border-solid border-gray-400">
                 <select
                  id="travellerType"
                  value={travellerType}
                  onChange={(e) => setTravellerType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                  <option value="family">Family</option>
                </select>
              </div>
            </div>
            
            {/* Duration Label and Select */}
            <div className="absolute top-[220px] md:top-[215px] left-[36px] md:left-[50px]">
              <label className="font-semibold text-black text-xl">
                Duration
              </label>
              <div className="flex w-[242px] items-center mt-2 rounded-lg overflow-hidden border border-solid border-gray-400">
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="oneday">One Day</option>
                  <option value="7days">7 Days</option>
                </select>
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="absolute top-[420px] md:top-[489px] left-[36px] md:left-[57px] bg-white text-black">
              <button
                type="submit"
                className="w-[191px] md:w-[300px] h-[43px] md:h-[60px] hover:bg-stone-800 hover:text-white py-2 px-4 rounded-full border border-black transition-colors duration-300"
              >
                Submit
              </button>
            </div>
  
          </div>
        </div>
      </div>
    </form>
  </div>
  )
};

export default SelectPasses;

