import "./App.css";
import { Flex, Input, Button } from "antd";
import { useState } from "react";

const inputText = {
  width: "30vh",
};
function App() {
  const [newTask, setNewTask] = useState("");
  const [buttonState, setButtonState] = useState(newTask.length === 0);
  const [tasks, setTasks] = useState([""]);

  const textChange = (text) => {
    setNewTask(text);
    setButtonState(text.length === 0);
  };

  const buttonClick = () => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTask("");
    setButtonState(newTask.length === 0);
  };

  return (
    <div className="vert-container">
      <div className="horiz-container">
        <Input
          style={inputText}
          value={newTask}
          placeholder="Type your task"
          allowClear
          onChange={(e) => textChange(e.target.value)}
        />
        <Button type="primary" disabled={buttonState} onClick={buttonClick}>
          Add to the list
        </Button>
      </div>
    </div>
  );
}

export default App;
