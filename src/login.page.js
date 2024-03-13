import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./styles.css";
import { auth } from "./firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.username, values.password)
      .then((userCredential) => {
        // Signed in
        console.log("SUCCESS");
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkPassword = (text) => {}; // 2Do for registration
  return (
    <div className="page-container">
      {/* header */}
      <div className="list-header">Please Login to Continue</div>
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

          <a
            className="login-form-forgot"
            // href=""
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/registration">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
