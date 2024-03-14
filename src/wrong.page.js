import React from "react";
import { Button, Result } from "antd";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function WrongPage() {
  const navigate = useNavigate();

  return (
    <Result
      className="vert-container"
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      }
    />
  );
}
