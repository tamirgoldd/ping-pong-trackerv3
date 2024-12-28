// File: firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb783mno-4OPqpyaehP4iSdsSxSap_Q-M",
  authDomain: "ping-pong-tracker-2f77f.firebaseapp.com",
  projectId: "ping-pong-tracker-2f77f",
  storageBucket: "ping-pong-tracker-2f77f.firebasestorage.app",
  messagingSenderId: "300112617875",
  appId: "1:300112617875:web:ebf82cbc158de6cc3ac866",
  measurementId: "G-4DVT7FXN0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut, db };
