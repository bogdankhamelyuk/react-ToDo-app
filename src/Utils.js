/**
 * Removes the element at the specified index from the toBeChangedArr array using Array.prototype.slice().
 *
 * @param {string[]} toBeChangedArr - The array of strings to be filtered.
 * @param {number} index - The index of the element to be removed.
 * @returns {string[]} - A new array with the element at the specified index removed.
 */
export const removeItem = (toBeChangedArr, index) => {
  return toBeChangedArr.slice(0, index).concat(toBeChangedArr.slice(index + 1));
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
