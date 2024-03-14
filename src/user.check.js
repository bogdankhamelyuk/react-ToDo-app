import "./styles.css";
import { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { useNavigate } from "react-router-dom";

export default function UserCheck() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("uid: ", uid);

        navigate("/main");
        // ...
      } else {
        console.log("user isnt registered yet: ", user);
      }
    });
  }, [navigate]);
  return (
    <div className="page-container" style={{ marginTop: "50%" }}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 80,
            }}
            spin
          />
        }
      />
    </div>
  );
}
