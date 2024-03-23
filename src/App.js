import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Routes from react-router-dom
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firbase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
import Payment2 from './Payment2';
import Sucess from './Sucess';
import Cancel from './Cancel';


const promise = loadStripe('pk_test_51OmcM5SB7qAnVMOrvJ7GVoqkGlDc7rpnAUL3xwhuhVpR8NnJR5GT6UdttCvVgPL9hhhmEq8A4Y7fa3uFpKOrKdud003dKpUYYt');

function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in 
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        // user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])


  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
        <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/success" element={<Sucess />} />
          <Route path="/cancel" element={<Cancel />} />
          {/* <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
