// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaXKvdyjFrgnT1jMcB_f5Bzul5WEkX68w",
  authDomain: "login-a638a.firebaseapp.com",
  projectId: "login-a638a",
  storageBucket: "login-a638a.firebasestorage.app",
  messagingSenderId: "983156449302",
  appId: "1:983156449302:web:a3532a24134bc989e15537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export default app