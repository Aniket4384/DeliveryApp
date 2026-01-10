// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "deliveryapp-9de03.firebaseapp.com",
  projectId: "deliveryapp-9de03",
  storageBucket: "deliveryapp-9de03.firebasestorage.app",
  messagingSenderId: "1075499515702",
  appId: "1:1075499515702:web:a68974cd6e70a8907a3d97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

