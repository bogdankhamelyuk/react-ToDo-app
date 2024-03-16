import "./styles.css";
import { List, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { removeItem, inputText, listItem, addButton } from "./Utils";
import { DeleteOutlined } from "@ant-design/icons";
import { SignOut } from "./user.check";
import Spinner from "./spinner.comp";
import WrongPage from "./wrong.page";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//hello
export default function MainPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isLoading = false;
  const [text, setText] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isDeleteActive, setDeleteButtonState] = useState(false);

  /**
   * Handles the change in selection state when a checkbox is checked or unchecked.
   *
   * @param {number} index - The index of the task in the tasks array.
   * @param {boolean} checked - The new state of the checkbox (`true` if checked, `false` if unchecked).
   * @returns {void}
   */
  const handleSelectionChange = (index, checked) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, tasks[index]]); //hello
    } else {
      const updatedItems = removeItem(selectedTasks, index);
      setSelectedTasks(updatedItems);
    }
  };

  const deleteTask = (index) => {
    const updatedItems = removeItem(tasks, index);
    setTasks(updatedItems);
    if (tasks.length === 1) {
      setDeleteButtonState(false); // set false when there's no task will be left
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

  const handleSignOut = async () => {
    // setIsLoading(true);
    SignOut();
    navigate("/login");
  };
  if (state && state.currentUser) {
    if (!isLoading) {
      return (
        <div className="page-container">
          {/* header */}
          <div
            className="horiz-container"
            style={{
              alignSelf: "stretch",
              gap: "1vh",
            }}
          >
            <div className="list-header">Your daily tasks</div>
            {/* delete button */}
            <Button disabled={tasks.length === 0} danger onClick={() => setDeleteButtonState(!isDeleteActive)}>
              {isDeleteActive ? "Done" : <DeleteOutlined />}
            </Button>
          </div>

          {/* List with the items from `tasks` */}
          <List
            className="task-list"
            bordered
            dataSource={tasks}
            renderItem={(item, index) => (
              <List.Item style={listItem}>
                {/* if there's no active delete display checkbox */}
                {isDeleteActive ? null : (
                  <Checkbox
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      handleSelectionChange(index, isChecked);
                    }}
                    style={{ marginRight: 0, width: 21, height: 32 }}
                  />
                )}

                {/* leave input in the middle  */}
                <Input value={item} variant="borderless" onChange={(e) => taskEdit(index, e.target.value)} />

                {/* if theres active delete then display delete icon */}
                {isDeleteActive ? (
                  <Button style={{ padding: 0 }} type="link" onClick={() => deleteTask(index)}>
                    ⛔
                  </Button>
                ) : null}
              </List.Item>
            )}
          />
          <div className="vert-container">
            <div className="horiz-container">
              {/*  INPUT and ADD Button */}
              <Input
                style={inputText}
                value={text}
                placeholder="Type your task"
                allowClear
                onChange={(e) => setText(e.target.value)}
              />
              <Button type="primary" disabled={text.length === 0} onClick={addTask} style={addButton}>
                Add
              </Button>
            </div>
            <Button danger onClick={() => handleSignOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  } else {
    return <WrongPage />;
  }
}
