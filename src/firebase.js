// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import {getFirestore} from  "firebase/firestore"

import { getApp } from 'firebase/app';

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
export const firebaseApp = getApp()
export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

