import React, { useState } from 'react'
import "./Login.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from './firbase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const singIn = e => {
        e.preventDefault();

        // some fancy firecase login .....

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const register = e => {
        e.preventDefault();


        // some fancy firecase login .....

        /* auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //it successfully create a new user with email and password
                console.log(auth);
            })
            .catch((error => alert(error.message))) */

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                if (userCredential) {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div className='login'>
            <NavLink to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </NavLink>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login__signInButton' onClick={singIn}>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON  CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login;
