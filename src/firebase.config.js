// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Uj8fxHJqUjYu2Tn_CJ39WYQEriPvr3M",
  authDomain: "react-todo-app-6b71a.firebaseapp.com",
  projectId: "react-todo-app-6b71a",
  storageBucket: "react-todo-app-6b71a.appspot.com",
  databaseURL: "https://react-todo-app-6b71a-default-rtdb.europe-west1.firebasedatabase.app",
  messagingSenderId: "640442615541",
  appId: "1:640442615541:web:251e5563f36590580c27bc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
