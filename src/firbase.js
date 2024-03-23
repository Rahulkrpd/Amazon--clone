// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app"; // Import initializeApp function
import { getAuth } from "firebase/auth"; // Import getAuth function
import { getFirestore } from "firebase/firestore"; // Import getFirestore function



const firebaseConfig = {
  apiKey: "AIzaSyArgaJKABTeoam0ceH2HZU5hVh-5ELg4jw",
  authDomain: "clone-c2c30.firebaseapp.com",
  projectId: "clone-c2c30",
  storageBucket: "clone-c2c30.appspot.com",
  messagingSenderId: "724414665242",
  appId: "1:724414665242:web:80c7b5c89db851b037b7a3",
  measurementId: "G-3QK405D8RV"
};


const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase app

const auth = getAuth(firebaseApp); // Get authentication service
const db = getFirestore(firebaseApp); // Get Firestore database service


export { db, auth };




/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore function
import { getAuth } from "firebase/auth"; // Import getAuth function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArgaJKABTeoam0ceH2HZU5hVh-5ELg4jw",
  authDomain: "clone-c2c30.firebaseapp.com",
  projectId: "clone-c2c30",
  storageBucket: "clone-c2c30.appspot.com",
  messagingSenderId: "724414665242",
  appId: "1:724414665242:web:80c7b5c89db851b037b7a3",
  measurementId: "G-3QK405D8RV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Get authentication service
const db = getFirestore(firebaseApp); // Get Firestore database service

export { db, auth };
 */