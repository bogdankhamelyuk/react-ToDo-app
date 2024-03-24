import "./styles.css";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Spinner from "./spinner.comp";
import { useNavigate } from "react-router-dom";
import { getFirebaseConfig, getUserData } from "./Utils";

export default function UserCheck() {
  const navigate = useNavigate();
  useEffect(() => {
    getFirebaseConfig().then((response) => {
      let app = "";
      if (!getApps().length) {
        app = initializeApp(response);
      }
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          getUserData(user.uid).then((response) => {
            const { doneTasks, allTasks } = response;
            console.log("Login success");
            navigate("/main", {
              state: {
                uid: user.uid,
                done: doneTasks,
                all: allTasks,
              },
            });
          });
        } else {
          console.log("user isnt registered yet: ", user);
          navigate("/login");
        }
      });
    });
  }, [navigate]);
  return <Spinner />;
}

export function SignOut() {
  getFirebaseConfig().then((response) => {
    if (!getApps().length) {
      const app = initializeApp(response);
      const auth = getAuth(app);
      signOut(auth);
    }
  });
}
