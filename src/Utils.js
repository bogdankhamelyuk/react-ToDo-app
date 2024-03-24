/**
 * Removes the element at the specified index from the toBeChangedArr array using Array.prototype.slice().
 *
 * @param {string[]} toBeChangedArr - The array of strings to be filtered.
 * @param {number} index - The index of the element to be removed.
 * @returns {string[]} - A new array with the element at the specified index removed.
 */
export const removeItem = (toBeChangedArr, index) => {
  const chArr = toBeChangedArr.slice(0, index).concat(toBeChangedArr.slice(index + 1));
  return chArr;
};
export const inputText = {
  width: "30vh",
};

export const addButton = {
  // maxWidth: "14vh"; */
  /* overflow: auto; */
  display: "flex",
  /* white-space: nowrap; */
  overflow: "hidden",
  textOverflow: "ellipsis",
  /* padding: 10px 20px; */
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingLeft: "10px",
};

export const listItem = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
};

export const getFirebaseConfig = async () => {
  return new Promise(async (resolve, reject) => {
    const resp = await fetch("https://pwyj743grf.execute-api.us-east-1.amazonaws.com/dev/api/firebase-config");
    const config = await resp.json();
    resolve(config);
  });
};

export const getUserData = async (uid) => {
  try {
    const url = "https://pwyj743grf.execute-api.us-east-1.amazonaws.com/dev/api/get-data"; // Replace with your actual AWS Lambda URL
    const requestBody = {
      uid: uid,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    return Promise.resolve(responseData);
    // return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update user data");
  }
};

export const updateUserData = async (uid, doneTasks, allTasks) => {
  try {
    const url = "https://pwyj743grf.execute-api.us-east-1.amazonaws.com/dev/api/update-data"; // Replace with your actual AWS Lambda URL
    // const url = "http://localhost:3000/api/update";
    const requestBody = {
      uid: uid,
      doneTasks: doneTasks,
      allTasks: allTasks,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    // console.log("Response:", responseData);
    return responseData; // If Lambda returns any response
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update user data");
  }
};
