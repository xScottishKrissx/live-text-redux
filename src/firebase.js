// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import {getFirestore} from  "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-4TJd7t7AA7HC0HW8i0AMQpnbL3BwdsU",
  authDomain: "live-text-19e71.firebaseapp.com",
  projectId: "live-text-19e71",
  storageBucket: "live-text-19e71.appspot.com",
  messagingSenderId: "104002767676",
  appId: "1:104002767676:web:44a73748b2c671e0936c39",
  measurementId: "G-5H6FHM9CW2"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();
// var provider = new firebase.auth.GoogleAuthProvider(); 
// export {auth , provider};