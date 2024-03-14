import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./styles.css";

export default function Spinner() {
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
  </div>;
}
