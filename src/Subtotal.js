import React from 'react'
import './subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js"
function Subtotal() {


    const [{ basket }, dispatch] = useStateValue();



    const navigate = useNavigate();
    
    /* const pay = () => {
        
        navigate('/payment')
    } */

  

   
    const pay = async () => {
        const stripe = await loadStripe("pk_test_51OmcM5SB7qAnVMOrvJ7GVoqkGlDc7rpnAUL3xwhuhVpR8NnJR5GT6UdttCvVgPL9hhhmEq8A4Y7fa3uFpKOrKdud003dKpUYYt");
    
        const body = {
            lineItems: basket.map(item => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.title
                    },
                    unit_amount: item.price * 100
                },
                quantity: 1
            })),
            // Include customer address information
            address: {
                name: "John Doe", // Replace with user-provided name
                line1: "123 Main St", // Replace with user-provided address
                city: "Bangalore", // Replace with user-provided city
                postal_code: "560001", // Replace with user-provided postal code
                country: "IN" // India
            }
        };
    
        const headers = {
            "Content-Type": "application/json"
        };
    
        try {
            const response = await fetch("http://localhost:7000/api/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
    
            const sessionData = await response.json();
    
            if (!sessionData.id) {
                throw new Error("Session ID not found");
            }
    
            const result = await stripe.redirectToCheckout({
                sessionId: sessionData.id // Pass the session ID obtained from the server
            });
    
            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
  

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of the homework */}
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button onClick={pay}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
