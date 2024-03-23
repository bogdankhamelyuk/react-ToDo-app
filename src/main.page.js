import "./styles.css";
import { List, Input, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { removeItem, inputText, listItem, addButton } from "./Utils";
import { SignOut } from "./user.check";
import Spinner from "./spinner.comp";
import WrongPage from "./wrong.page";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "./Utils";

export default function MainPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const uid = state.currentUser;
  const isLoading = false;
  const [text, setText] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isSelectActive, setIsSelectActive] = useState(false);
  /**
   * Handles the change in selection state when a checkbox is checked or unchecked.
   * @param {number} index - The index of the task in the allTasks array.
   * @param {boolean} checked - The new state of the checkbox (`true` if checked, `false` if unchecked).
   * @returns {void}
   */
  const handleSelectionChange = (index, checked) => {
    console.log(checked);
    if (checked) {
      setDoneTasks([...doneTasks, allTasks[index]]);
    } else {
      const selectedNew = doneTasks.filter((task) => task !== allTasks[index]);
      setDoneTasks(selectedNew);
    }
  };

  const deleteTask = (index) => {
    const selectedNew = doneTasks.filter((task) => task !== allTasks[index]);
    setDoneTasks(selectedNew);
    const doneNew = removeItem(allTasks, index);
    setAllTasks(doneNew);
    if (allTasks.length === 1) {
      setIsSelectActive(false); // set false when there's no task will be left
    }
  };

  const addTask = () => {
    const updatedTasks = [...allTasks, text];
    setAllTasks(updatedTasks);
    setText([]);
  };

  const taskEdit = (index, newText) => {
    const updatedTasks = [...allTasks];
    updatedTasks[index] = newText;
    setAllTasks(updatedTasks);
  };

  const handleSignOut = () => {
    // setIsLoading(true);
    SignOut();
    navigate("/login");
  };

  useEffect(() => {
    updateUserData(uid, doneTasks, allTasks);
  }, [allTasks, doneTasks, uid]);

  if (uid) {
    // ask for state as well, otherwise: TypeError: Cannot read properties of null (reading 'currentUser')
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
            <div className="list-header">Your daily allTasks</div>
            {/* ToD0o */}

            <Button disabled={allTasks.length === 0} onClick={() => setIsSelectActive(!isSelectActive)}>
              {isSelectActive ? "Done" : "Select"}
            </Button>
          </div>

          {/* List with the items from `allTasks` */}
          <List
            className="task-list"
            bordered
            dataSource={allTasks}
            renderItem={(item, index) => (
              <List.Item style={listItem}>
                {/* if there's no active delete display checkbox */}
                {isSelectActive ? (
                  <Checkbox
                    checked={doneTasks.includes(allTasks[index])}
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      handleSelectionChange(index, isChecked);
                    }}
                    style={{ marginRight: 0, width: 21, height: 32 }}
                  />
                ) : null}

                {/* leave input in the middle  */}
                <Input
                  value={item}
                  variant="borderless"
                  onChange={(e) => taskEdit(index, e.target.value)}
                  style={{
                    textDecoration: doneTasks.some((task) => task === allTasks[index]) ? "line-through" : "none",
                  }}
                />

                {/* if theres active delete then display delete icon */}
                {isSelectActive ? (
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
