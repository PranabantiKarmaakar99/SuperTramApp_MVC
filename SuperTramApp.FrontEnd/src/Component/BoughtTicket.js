import React, { useState } from 'react';
import Barcode from 'react-barcode'; // or import QRCode from 'qrcode.react';
import QRCode from 'react-qr-code';
import { useLocation } from 'react-router-dom';

const BoughtTicket = () => {
  const location = useLocation();
  const { cart, order } = location.state || {};

  const [isActivated, setIsActivated] = useState(false);
  
  const ticketCode = `TICKET-${Math.random().toString(36).substring(2, 15)}`;
  const handleActivateTicket = () => {

    setIsActivated(true);

  };

  return (

<div className="bg-white flex flex-row justify-center w-full">
    <div className="bg-white overflow-hidden w-[430px] h-[765px] mt-[78px] relative">
  
      <div className="absolute w-[385px] h-[645px] top-[80px] left-6 bg-[#d9d9d9] rounded-2xl">
        <div className="absolute w-[159px] h-[23px] top-[38px] left-[22px] [font-family:'Roboto_Slab',Helvetica] font-semibold text-black text-xl tracking-[0] leading-5 whitespace-nowrap">
          {cart.map((item, index) => (<ul key={index} className="">{item.ticket.title} </ul>))}
        </div>
        <div className="absolute w-[359px] h-[394px] top-[100px] left-2">
          {/* <img
            className="absolute w-[359px] h-[359px] top-[27px] left-0"
            alt="Qr code svgrepo com"
            src="https://c.animaapp.com/bKLqk8XQ/img/qr-code-svgrepo-com-1.svg"
          /> */}
          <div className="absolute w-[359px] h-[359px] top-[61px] left-0">
            <QRCode value={ticketCode} style={{marginTop:"30px", marginLeft:"56px"}}/>
          </div>
          <div className="w-[154px] h-[38px] top-[19px] left-[46px] [font-family:'Roboto_Slab',Helvetica] font-medium text-sm leading-[14px] absolute text-black tracking-[0]">
            Cart Details: {cart.map((item, index) => (<ul key={index} className="text-sm md:text-base md:mt-[-19px] white whitespace-nowrap ml-[80px] mt-[-15px]">{item.ticket.title} x {item.quantity} = £{item.ticket.price}</ul>))}
            
          </div>
          <div className="absolute w-[154px] h-[38px] top-[394px] left-[46px] [font-family:'Roboto_Slab',Helvetica] font-medium text-black text-sm tracking-[0] leading-[14px] whitespace-nowrap">
            Valid: 24 hours after buying
          </div>
          <div className="absolute w-[300px] h-[38px] top-0 left-[46px] [font-family:'Roboto_Slab',Helvetica] font-medium text-black text-sm tracking-[0] leading-[14px]">
            OrderID: {order.user.userName}
          </div>
        </div>
        <div className="absolute w-[200px] h-[49px] top-[579px] left-[20px] ">
          {/* <div className="w-[135px] top-3 left-[39px] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[length:var(--single-line-body-base-font-size)] leading-[var(--single-line-body-base-line-height)] whitespace-nowrap absolute text-black tracking-[var(--single-line-body-base-letter-spacing)] [font-style:var(--single-line-body-base-font-style)]">
            Activated Pass
          </div> */}
          <button
          onClick={handleActivateTicket}
          disabled={isActivated}
          className={`p-2 rounded-full w-[200px] transition duration-300   ${
            isActivated ? 'bg-blue-400 cursor-not-allowed' : 'bg-custom-gray text-black border border-black'
          }`}
        >
          {isActivated ? 'Ticket Activated' : 'Activate Ticket'}
        </button>
        </div>
      </div>
      <div className="absolute w-[182px] h-9 top-[22px] left-7 [font-family:'Roboto_Slab',Helvetica] font-semibold text-black text-xl tracking-[0] leading-5">
        Your Ticket
      </div>
      {/* <div className="absolute w-[163px] top-[34px] left-[25px] font-heading font-[number:var(--heading-font-weight)] text-[#2718d9] text-[length:var(--heading-font-size)] tracking-[var(--heading-letter-spacing)] leading-[var(--heading-line-height)] whitespace-nowrap [font-style:var(--heading-font-style)]">
        SUPERTRAM
      </div> */}
    </div>
  </div>
  );
};

export default BoughtTicket;



{/* <div className="container p-4 md:p-6 lg:p-8 border border-red-300 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Ticket</h1>
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">User Information:</h2>
        <p>Name: {order.user.userName}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Cart Information:</h2>
        <ul className="list-disc list-inside">
          {cart?.map((item, index) => (
            <li key={index} className="text-sm md:text-base">
              {item.ticket.title} - {item.quantity} x ${item.ticket.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Ticket Code:</h2>
        <p className="text-sm md:text-base mb-2">{ticketCode}</p>
        <div className="flex justify-center">
          <QRCode value={ticketCode} />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleActivateTicket}
          disabled={isActivated}
          className={`p-2 rounded-lg transition duration-300 ${
            isActivated ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isActivated ? 'Ticket Activated' : 'Activate Ticket'}
        </button>
      </div>
    </div> */}



