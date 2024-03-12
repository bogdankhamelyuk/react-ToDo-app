import "./App.css";
import { List, Input, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { unselectItems } from "./Utils";
const inputText = {
  width: "30vh",
};
const taskList = {
  maxHeight: "55vh",
  minHeight: "55vh",
  overflowY: "auto",
  border: "none",
  width: "50vh",
  marginTop: "1vh",
};

function App() {
  const [text, setText] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const textChange = (text) => {
    setText(text);
  };

  const handleSelectionChange = (index, checked) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, tasks[index]]);
    } else {
      const updatedItems = unselectItems(tasks, selectedTasks, index);
      setSelectedTasks(updatedItems);
    }
  };

  const buttonClick = () => {
    const updatedTasks = [...tasks, text];
    setTasks(updatedTasks);
    setText([]);
  };

  return (
    <div className="page-container">
      <div className="list-header">Your daily tasks</div>
      <List
        style={taskList}
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item>
            <Checkbox
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleSelectionChange(index, isChecked);
              }}
            >
              {item}
            </Checkbox>
          </List.Item>
        )}
      />
      {/* here goes input, add button and delete button underneath  */}
      <div className="vert-container">
        <div className="horiz-container">
          <Input
            style={inputText}
            value={text}
            placeholder="Type your task"
            allowClear
            onChange={(e) => textChange(e.target.value)}
          />
          <Button
            type="primary"
            disabled={text.length === 0}
            onClick={buttonClick}
          >
            Add to the list
          </Button>
        </div>
        <div className="horiz-container">
          <Button type="primary" danger disabled={selectedTasks.length === 0}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
