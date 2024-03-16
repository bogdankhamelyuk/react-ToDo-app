// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const getFirebaseConfig = async () => {
  try {
    const response = await fetch("https://pwyj743grf.execute-api.us-east-1.amazonaws.com/dev/api/firebase-config", {
      mode: "cors",
    });
    if (response.ok) {
      const firebaseConfig = await response.json();
      return firebaseConfig;
    } else {
      window.alert("Response is not okay!");
      console.log(response);
    }
  } catch (error) {
    window.alert(error);
  }
};
// Initialize Firebase
// export default async function FirebaseConfig() {
//   const firebaseConfig = await getFirebaseConfig();
//   const app = initializeApp(firebaseConfig);
//   const database = getDatabase(app);
//   const auth = getAuth(app);
//   return app, database, auth;
// }
