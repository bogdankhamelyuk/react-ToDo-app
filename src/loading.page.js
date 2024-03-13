import React from "react";
import "./styles.css";
import { auth } from "./firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import MainPage from "./main.page";
import LoginPage from "./login.page";

export default function AuthLoading() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("uid: ", uid);
        setIsAuthenticated(true);
        // ...
      } else {
        console.log("user isnt registered yet: ", user);
        setIsAuthenticated(false);
      }
    });
  }, []);

  return isAuthenticated ? <MainPage /> : <LoginPage />;
}
