import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { MdDetails } from 'react-icons/md';



// Replace with your Stripe public key
const stripePromise = loadStripe('pk_test_51PlxmbG2qsdoy2kQc7sua2OklD723l5YPNN8NujQcrHhlPusUOFGeoypuYYR97zwZkHOGQUrD2ckNOsYji6ruWfq00KVJD0QQE');

const StripePayment = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const location = useLocation();
    const { order,cart,ticket } = location.state || {}; 
    const { user } = useAuth();
    const navigate = useNavigate();
    var cart1 = localStorage.getItem('cart');

    //var ticket =cart.$values
    //var ticketD =JSON.stringify(ticket.map(a=>a.ticket.title));
    //var ticketC =JSON.stringify(ticket.map(a=>a.ticket.title));;
    //var ticketD =JSON.stringify(ticket.map(a=>a.ticket.title).join(', '));

    
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);

        try {
            // Call your backend to create a PaymentIntent
            const { data } = await axios.post('https://localhost:7058/api/Payments/create-payment-intent', {amount});

           
            const cardElement = elements.getElement(CardElement);
            const { clientSecret, successMessage } = data;
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Test User',
                    },
                },
            });

            if (paymentResult.error) {
                setError(`Payment failed: ${paymentResult.error.message}`);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                setError(null);
                alert('Payment successful!');
               
                //const { user } = useAuth();
                await axios.post('https://localhost:7058/api/Payments/complete-payment', {
                    PaymentStatus: paymentResult.paymentIntent.status,
                    TicketCode: "123456", // Replace with actual ticket code
                    TicketDetails: "ticket", // Replace with actual details
                    UserEmail: JSON.stringify(order.user.userName)
                    
                });
    
                setError(null);
                alert(`${successMessage} and Payment successful! Ticket has been sent to your email.`);
                navigate('/wallet',{state: { order:order,cart:cart }})
              
            }
        } catch (error) {
            setError(`Payment failed: ${error.message}`);
            console.log('order',order.user.userName)
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div style={{ color: 'grey' }}>{error}</div>}
            <button
                type="submit"
                disabled={!stripe || paymentProcessing}
                className="w-full py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition duration-200 mt-4"
            >
                {paymentProcessing ? 'Processing...' : `Pay ${amount} GBP`}
            </button>
        </form>
    );
};

const OrderSummary = () => {
    
    
    const navigate = useNavigate();
    const location = useLocation();
    const { order,cart } = location.state || {}; 
   
     const totalAmount = cart.reduce((total, item) => total + item.ticket.price * item.quantity, 0);

    return (
        <Elements stripe={stripePromise}>
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mt-20">
                    <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
                    <div className="mb-4">
                    <h2 className="text-xl font-medium">Customer Details</h2>
                    <p className="text-gray-700">{order.user.
userName
}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-medium">Cart Details</h2>
                    {cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div>
                                <p className="text-gray-700">{item.ticket.title}</p>
                                <p className="text-sm text-gray-500"> Quantity: {item.quantity} </p>
                            </div>
                            <p className="text-gray-700">{item.ticket.price} GBP</p>
                        </div>
                    ))}
                    <div className="flex justify-between items-center font-bold">
                        <p className="text-gray-700">Total</p>
                        <p className="text-gray-700">
                            {cart.reduce((total, item) => total + item.ticket.price * item.quantity, 0)} GBP
                        </p>
                    </div>
                </div>
                <div>
                <StripePayment amount={totalAmount} />
                <button onClick={() => navigate('/')} className="w-full py-2 my-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                   Back To Home Page
                </button>
                </div>
                  
                </div>
            </div>
        </Elements>
    );
};

export default OrderSummary;
