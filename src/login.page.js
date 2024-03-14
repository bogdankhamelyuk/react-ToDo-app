import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./styles.css";
import { auth } from "./firebase.config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function LoginPage() {
  const [loginView, setLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setIsLoading(true);
    if (loginView) {
      signInWithEmailAndPassword(auth, values.username, values.password)
        .then((userCredential) => {
          // Signed in
          console.log("Login success");
          navigate("/main");
          // ...
        })
        .catch((error) => {
          setIsLoading(false);
          window.alert(error); // Display an alert message
        });
    } else {
      createUserWithEmailAndPassword(auth, values.username, values.password)
        .then((userCredential) => {
          // Signed up
          // const user = userCredential.user;
          console.log("registration completed!");
        })
        .catch((error) => {
          setIsLoading(false);
          window.alert(error); // Display an alert message
          // ..
        });
    }
  };
  // const checkPassword = (text) => {}; // 2Do for registration
  if (!isLoading) {
    return (
      <div className="page-container">
        {loginView ? <div className="list-header">Please Login to Continue</div> : <div className="list-header">Please Register to Continue</div>}{" "}
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
              {loginView ? <Button onClick={() => setLoginView(!loginView)}>Register Now</Button> : <Button onClick={() => setLoginView(!loginView)}>Login Now</Button>}
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="page-container">
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
}
