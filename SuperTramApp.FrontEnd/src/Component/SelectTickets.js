import React, { useState } from 'react';
import axios from 'axios';
import TicketCard from './Ticket';
import { useNavigate } from 'react-router-dom';


const SelectTickets = () => {
  const [ticketType, setTicketType] = useState('Single');
  const [travellerType, setTravellerType] = useState('Adult');
  const [zone, setZone] = useState('SingleZone');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const ticketDetails = {
      ticketType,
      travellerType,
      zone
    };

    try {
      const response = await axios.post('https://localhost:7058/api/Ticket/get-ticket-details', ticketDetails, {headers: {
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
              Tickets
            </div>
            
            {/* Zone Label and Select */}
            <div className="absolute top-[125px] md:top-[120px] left-[36px] md:left-[50px]">
              <label className="font-semibold text-black text-xl">
                Zone
              </label>
              <div className="flex w-[242px] items-center mt-2 rounded-lg overflow-hidden border border-solid border-gray-400">
                <select
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-[217px] shadow border appearance-none rounded-lg w-full h-[40px] text-gray-600 p-1leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="SingleZone">SingleZone</option>
                  <option value="DoubleZone">DoubleZone</option>
                </select>
              </div>
            </div>
            
            {/* Traveller Type Label and Select */}
            <div className="absolute top-[220px] md:top-[215px] left-[36px] md:left-[50px]">
              <label className="font-semibold text-black text-xl">
                Traveller
              </label>
              <div className="flex w-[242px] items-center mt-2 rounded-lg overflow-hidden border border-solid border-gray-400">
                <select
                  id="travellerType"
                  value={travellerType}
                  onChange={(e) => setTravellerType(e.target.value)}
                  className="w-[217px] shadow border appearance-none rounded-lg w-full h-[40px] text-gray-600 p-1leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Adult">Adult</option>
                  <option value="Child">Child</option>
                </select>
              </div>
            </div>
  
            {/* Ticket Type Radio Buttons */}
            <div className="absolute top-[312px] md:top-[325px] left-[42px] md:left-[58px]">
              <div className="flex flex-col w-[340px] md:w-auto">
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ticketType"
                      value="Single"
                      checked={ticketType === 'Single'}
                      onChange={() => setTicketType('Single')}
                      className="mr-2"
                    />
                    Single
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ticketType"
                      value="Return"
                      checked={ticketType === 'Return'}
                      onChange={() => setTicketType('Return')}
                      className="mr-2"
                    />
                    Return
                  </label>
                </div>
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
    



    



  );
};

export default SelectTickets;



