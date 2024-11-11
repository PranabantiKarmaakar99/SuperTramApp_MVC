import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from './AuthContext';

export const Cart = () => {
    const location = useLocation();
    const { user } = useAuth();
   
    const { cart } = location.state || {};
    const navigate = useNavigate();

      console.log("cart1",cart);
      const user1 = localStorage.getItem('user')
      
    const handleClick = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/signin');
            return;
        }
    
        try {
            const response = await axios.post('https://localhost:7058/api/Cart/CheckOut-1',cart, {
              
                headers: {
                     
                     Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                }
            });
    
            if (response.status === 200) {
                alert('Checkout successful!');
                console.log("cart",cart)
                console.log("order ",response.data)
                navigate('/checkout', { state: { order: response.data, cart:cart } });
            }
        } catch (error) {
            console.error('Error during checkout:', error.response ? error.response.data : error.message);
            alert('Failed to checkout.');
        }
    }

    return (
        <div className="relative w-full h-full bg-gray-100">
            <div className="absolute inset-0">
                <div className="relative h-full">
                 
                    <div className="mt-20 mx-auto max-w-4xl p-4">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                       
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                            {cart.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="text-gray-700">{item.ticket.title}</p>
                                           
                                        </div>
                                        <p className="text-gray-700">{item.ticket.price} GBP</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700">Total</p>
                                <p className="text-gray-700">
                                    {cart.reduce((total, item) => total + item.ticket.price * item.quantity, 0)} GBP
                                </p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-700">{user?.Name || 'Guest'}</p>
                             
                            </div>
                            <button onClick={handleClick} className="w-full py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition duration-200">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


