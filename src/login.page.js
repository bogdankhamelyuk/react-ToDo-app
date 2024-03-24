import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./styles.css";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Spinner from "./spinner.comp";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirebaseConfig, getUserData } from "./Utils";

export default function LoginPage() {
  const [loginView, setLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setIsLoading(true);
    getFirebaseConfig().then((response) => {
      const app = initializeApp(response);
      const auth = getAuth(app);
      if (loginView) {
        signInWithEmailAndPassword(auth, values.username, values.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const uid = user.uid;

            getUserData(uid).then((response) => {
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
          })
          .catch((error) => {
            setIsLoading(false);
            window.alert(error); // Display an alert message
          });
      } else {
        console.log("i am here");
        createUserWithEmailAndPassword(auth, values.username, values.password)
          .then((userCredential) => {
            // Signed up
            // const user = userCredential.user;
            const user = userCredential.user;
            const uid = user.uid; // Get the UID of the newly created user
            console.log("registration completed!");
            navigate("/main", { state: { currentUser: uid } });
          })
          .catch((error) => {
            setIsLoading(false);
            window.alert(error); // Display an alert message
          });
      }
    });
  };
  if (!isLoading) {
    return (
      <div className="page-container">
        {loginView ? (
          <div className="list-header">Please Login to Continue</div>
        ) : (
          <div className="list-header">Please Register to Continue</div>
        )}{" "}
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a
            className="login-form-forgot"
            // href=""
          >
            Forgot password
          </a> */}
          </Form.Item>

          <Form.Item>
            <div className="button-text">
              {loginView ? (
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in{" "}
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
              )}
              Or
              {loginView ? (
                <Button onClick={() => setLoginView(!loginView)}>Register Now</Button>
              ) : (
                <Button onClick={() => setLoginView(!loginView)}>Login Now</Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return <Spinner />;
  }
}
