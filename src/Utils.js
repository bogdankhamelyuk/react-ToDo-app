export const unselectItems = (tasks, selectedItems, index) => {
  return selectedItems.filter((item) => item !== tasks[index]);
};
