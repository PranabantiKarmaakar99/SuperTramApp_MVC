import React from 'react';
import { useNavigate } from 'react-router-dom'; 

import Map from './Interactive map';
import MapPage from '../pages/MapPage.js';
import Map2 from './MapComponent.js';
import { MdOutlineStarBorder } from "react-icons/md";



export const Landing_Page = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to navigate to the select-tickets page
  const handleBuyPassesClick = () => {
    navigate('/select-passes');
  };

  const handleBuyTicketsClick = () => {
    navigate('/select-tickets'); // Navigate to the select-passes page
  };

  const handleFavourites = () => {
    navigate('/favourites'); 
  };



  return (
    <div className="bg-white flex justify-center item-center w-full">
  {/* Mobile View */}
  <div className="sm:hidden absolute top-[75px] w-[430px] h-[700px]  ">
    
    <div className='h-[300px] top-[14px] w-full '>
      <Map />
    </div>
    (<div className="absolute w-[134px] h-[30px] top-[700px] left-[294px]">
      <div className="relative w-[191px] h-[49px] top-[-29px] text-center left-[-65px] transition-all duration-100 ease-in-out transform bg-white hover:bg-red-200 text-lg border-2 border-black  text-black hover:text-xl hover:scale-110  font-bold py-2 px-4 rounded-full"onClick={handleBuyPassesClick} >
        Buy Passes
      </div>
    </div>)

    <div className="absolute w-[185px] h-[30px] top-[690px] left-[23px]">
      <div className="relative w-[191px] h-[49px] top-[-16px] text-center transition-all duration-100 ease-in-out transform bg-stone-700 hover:bg-stone-400 text-lg hover-text-xl hover:scale-110 text-white font-bold py-2 px-4 rounded-full" onClick={handleBuyTicketsClick} >
        Buy Tickets
      </div>
    
    </div>
    <div className="absolute w-[150px] h-[30px] top-[750px] left-[40px] flex items-center">
          <MdOutlineStarBorder 
            className="text-yellow-500 text-4xl cursor-pointer" 
            onClick={handleFavourites}
          />
          <span className="text-black text-lg ml-2">Favorites</span>
        </div>
  </div>

  {/* Desktop View */}
  <div className="hidden sm:block w-full">
    <div className="bg-white overflow-hidden w-full h-[800px] relative">
      <div className="absolute w-full h-[900px] top-0 left-0">
        <div className="w-full h-[900px] bg-[#d9d9d9] absolute z-10">
          <Map />
        </div>
        <div className="relative w-[407px] h-[600px] top-16 left-[100px] bg-white rounded-[10px] overflow-hidden z-20 shadow-lg">
          <div className="absolute w-[333px] h-[60px] top-[228px] left-[37px] bg-[#2718d9] rounded-[5px] overflow-hidden">
            <div className="left-[110px] absolute w-[231px] top-2.5 text-xl text-white tracking-[var(--m3-headline-medium-letter-spacing)] leading-[var(--m3-headline-medium-line-height)] [font-style:var(--m3-headline-medium-font-style)]" onClick={handleBuyTicketsClick} >
              Buy Tickets
            </div>
          </div>
          <div className="absolute w-[333px] h-[60px] top-[370px] left-[37px] bg-[#2718d9] rounded-[5px] overflow-hidden">
            <div className="left-[111px] absolute w-[231px] top-2.5 text-xl text-white tracking-[var(--m3-headline-medium-letter-spacing)] leading-[var(--m3-headline-medium-line-height)] [font-style:var(--m3-headline-medium-font-style)]" onClick={handleBuyPassesClick}>
              Buy Passes
            </div>
          </div>

          <div className="absolute w-[333px] h-[60px] top-[450px] left-[40px] flex items-center">
          <MdOutlineStarBorder 
            className="text-yellow-500 text-4xl cursor-pointer" 
            onClick={handleFavourites}
          />
          <span className="text-black text-lg ml-2">Favorites</span>
        </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
   
  );
};

export default Landing_Page;

