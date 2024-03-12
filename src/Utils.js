export const unselectItems = (tasks, selectedItems, index) => {
  return selectedItems.filter((item) => item !== tasks[index]);
};

export const inputText = {
  width: "30vh",
};
export const taskList = {
  maxHeight: "55vh",
  minHeight: "55vh",
  overflowY: "auto",
  border: "none",
  width: "50vh",
  marginTop: "1vh",
};

export const listItem = {
  display: "flex",
  justifyContent: "flex-start",
};
