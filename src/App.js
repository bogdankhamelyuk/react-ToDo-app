import "./App.css";
import { List, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { unselectItems, inputText, taskList, listItem } from "./Utils";
import { DeleteOutlined } from "@ant-design/icons";

function App() {
  const [text, setText] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isDeleteActive, setDeleteButtonState] = useState(false);
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

  const addTask = () => {
    const updatedTasks = [...tasks, text];
    setTasks(updatedTasks);
    setText([]);
  };

  const taskEdit = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newText;
    setTasks(updatedTasks);
  };

  // const toggleDelete = () => {};

  return (
    <div className="page-container">
      <div className="list-header">Your daily tasks</div>
      <div
        className="horiz-container"
        style={{
          justifyContent: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <Button
          danger
          style={{ background: isDeleteActive ? "green" : "red", color: "white" }}
          type={isDeleteActive ? "link" : "primary"}
          onClick={() => setDeleteButtonState(!isDeleteActive)}
        >
          {isDeleteActive ? "Done" : <DeleteOutlined />}
        </Button>
      </div>
      <List
        style={taskList}
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item style={listItem}>
            {isDeleteActive ? (
              <Button style={{ padding: 0 }} type="link">
                ⛔
              </Button>
            ) : (
              <Checkbox
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  handleSelectionChange(index, isChecked);
                }}
                style={{ marginRight: 0, width: 21, height: 32 }}
              />
            )}
            <Input value={item} variant="borderless" onChange={(e) => taskEdit(index, e.target.value)} />
          </List.Item>
        )}
      />
      <div className="vert-container">
        {/*  INPUT and ADD Button */}
        <div className="horiz-container">
          <Input style={inputText} value={text} placeholder="Type your task" allowClear onChange={(e) => textChange(e.target.value)} />
          <Button type="primary" disabled={text.length === 0} onClick={addTask}>
            Add to the list
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
