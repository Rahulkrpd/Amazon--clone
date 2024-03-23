import React, { useState } from 'react';
import "./payment.css"
import { useStateValue } from './StateProvider';
import CurrencyFormat from "react-currency-format";
import CheckOutProduct from './CheckoutProduct';
import { NavLink } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import {db} from "./firbase.js"


const Payment = () => {
    const navigate = useNavigate()
;

    const [{ basket, user }, dispatch] = useStateValue();

    // for payment using strip and using  Hook

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);


    useEffect(() => {
        //generate the special stripe secret which allow us to charge a customer

        const getClientSecret = async () => {
            const respose = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(respose.data.clientSecret)
        }
        getClientSecret();

    }, [basket])


    console.log("the secret is this >>>", clientSecret)

   console.log('user',user)
  

    const handleSubmit = async (event) => {
        // do all the facny 
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            /* db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created

                

            }) */

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            
            dispatch({
                type:'EMPTY_BASKET',
            })
            navigate('/orders')
        })
    }

    const handleChange = event => {
        //Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>Checkout (<NavLink to='/checkout'>{basket?.length}</NavLink> items)</h1>

                {/* payment section -delivery address */}

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery  Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angles ,CA</p>
                    </div>
                </div>


                {/* payment section Item */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Item and delivery</h3>

                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckOutProduct
                                key={item.id} // Make sure to add a unique key prop
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} />
                        ))}
                    </div>
                </div>

                {/* payment section payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic will go there */}

                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // 

                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
