
import React,{useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketCard = () => {
  const [ticketId, setTicketId] = useState('');
  const location = useLocation();
  const { ticket } = location.state || {};
  const navigate = useNavigate(); 

 

  const handleAddToCart = async (e) => {
    e.preventDefault();
      
    try {
      const response = await axios.post('https://localhost:7058/api/Cart/AddToCart', {
        id:ticket.id,
       
      }
      );
  
      if (response.status === 200) {
        alert('Ticket added to cart successfully!');
        console.log(response.data);
       var cart = response.data;
       localStorage.setItem('cart',response.data)
axios.post('https://localhost:7058/api/Cart/save', { cart:response.data })
  .then(response => {
    console.log('Cart saved to server:', response.data);
  })
  .catch(error => {
    console.error('Error saving cart:', error);
  }); 
      
        navigate('/cart', { state: { cart: cart } });
      }
    } catch (error) {
      console.error('Error adding ticket to cart:', error.response ? error.response.data : error.message);
      alert('Failed to add ticket to cart.');
    }
  };
  

  return (
  


    <div>
        <div className="absolute w-[375px] h-[199px] top-[164px] left-[28px] rounded-[17px] shadow-[0px_4px_4px_#00000040] [background:linear-gradient(180deg,rgb(212.16,209.49,242.89)_0%,rgb(255,255,255)_53.6%)]" />
           {/* <img className="w-full h-48 object-cover" src={ticket.image} alt={ticket.title} /> */}
          <div className="absolute w-[159px] h-[23px] top-[188px] left-[62px] [font-family:'Roboto_Slab',Helvetica] font-semibold text-black text-xl tracking-[0] leading-5 whitespace-nowrap">
            {ticket.title}
          </div>
          <div className="absolute w-[159px] h-[23px] top-[218px] left-[63px] [font-family:'Roboto_Slab',Helvetica] font-light text-black text-[14px] tracking-[0] leading-[10px]">
            {ticket.description}
          </div>
            <div className="absolute px-6 pt-4 pb-2 top-[290px] left-[38px]">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ticket.type}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`£${ticket.price}`}</span>
                <button
                  onClick={handleAddToCart}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  Add To Cart
                </button>
              </div>
         {/* <div className="absolute w-[159px] h-[23px] top-[324px] left-[65px] [font-family:'Roboto_Slab',Helvetica] font-semibold text-black text-xl tracking-[0] leading-5 whitespace-nowrap">
            5 GBP
           </div>  */}
        
        </div>
  );
};

export default TicketCard;
