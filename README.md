# About
This ToDo application features user registration/authentication to facilitate data synchronization across sessions and devices.

## Used technologies
Frontend: 
  * ReactJs
  * Ant Design
  * CSS

Backend: 
  * Firebase (hosting + user authentication)
  * AWS (Lambda functions)
  * Serverless (upload Express.Js server to AWS Lambda)
  * MongoDB (data storage)
    
## Internal logic

1) user follows the basic link with no suffixes: "/"
    - Initialize the application by retrieving the Firebase Configuration from the Express server through a GET request running on a Lambda function.
    - Receive the Authentication instance associated with the provided app from the previous step.
    - Monitor changes in the authentication state. If the user does not exist (i.e., is not registered yet), automatically navigate to the login page ("/login").
    - If the user exists, check the latest data from MongoDB by sending a POST request to the Express server. Navigate to the main page ("/main") and include the received data (tasks).
2) user is on login page ("/login")
    - if user exists
      - search with user ID in MangaDB for data entries or create new
    - if user does not exists
      - register and then receive newly created user ID
      - create database for new user
    - navigate to main ("/main")
3) user is on main page  
     - Initialize the state string arrays `doneTasks` and `allTasks` by utilizing the `useState` hook with data passed from preceding pages.
     - When any changes occur within `doneTasks` or `allTasks`, update the corresponding database values by sending `POST` requests to Express. Use the `useEffect` hook for this purpose.

## Conclusion 
In summary, this ToDo application provides a robust solution for managing tasks, with a user-friendly interface and seamless data synchronization capabilities across different sessions and devices. Application is an example of MERN-Stack and typical CRUD-operations. 
