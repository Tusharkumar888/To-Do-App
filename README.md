# To-Do List Application

A **full-stack To-Do List application** designed for authenticated users to securely manage their tasks. Each user has a **personalized** and **private to-do list** that only they can access. The application allows users to manage their tasks effectively while ensuring **data security**, **scalability**, and a **user-friendly experience** across all devices.

## Features

### **User Authentication**
- **Sign-up & Login**: Users can sign up for a new account or log in using their email and password.
- **JWT Authentication**: After logging in, users receive a **JWT token** that ensures secure access to their personalized to-do list. This token is required for accessing and modifying tasks.
- **Password Security**: Passwords are securely hashed before being stored in the database.

### **Personalized To-Do Lists**
- Each user is assigned a private to-do list that they can access at any time after logging in.
- Users can manage tasks associated with their account, ensuring that tasks are kept private and cannot be accessed by unauthorized users.

### **Task Management**
- **Add New Tasks**: Users can add new tasks to their to-do list, specifying task names, descriptions, and other optional details.
- **Update Tasks**: Existing tasks can be edited for changes, such as modifying task names or adding new information.
- **Mark Tasks as Complete**: Users can easily mark tasks as complete, helping to track progress.
- **Delete Tasks**: Users can delete tasks from their to-do list when no longer needed.

### **Data Security**
- **Private Data**: Users' tasks are securely stored, and no one can access or modify the tasks of another user.
- **JWT Token-based Session Management**: JWT tokens are used to ensure that only authenticated users can access or modify their tasks.
- **Input Validation**: The application uses **Zod** to validate inputs before they are processed, minimizing the risk of invalid data.

### **Responsive Design**
- The app is fully responsive, adapting to different screen sizes and devices.
- **Mobile-first approach**: The user interface is designed to provide an optimal experience for mobile users first, ensuring smooth usage across various platforms, including mobile phones, tablets, and desktop computers.

### **User Interface (UI)**
- **Interactive UI**: React is used to build an interactive user interface that dynamically updates the to-do list.
- **Modern Styling**: Tailwind CSS is used for styling the app, providing a clean, modern, and responsive design with minimal CSS bloat.

---

## Technology Stack

### **Frontend**
- **React**: The core framework used to build the dynamic user interface. React allows for component-based architecture, making the UI modular and easy to maintain.
- **Tailwind CSS**: A utility-first CSS framework that allows for fast and flexible UI styling. It offers a modern, responsive, and minimalistic design approach.
- **React Router DOM**: A library for managing the application's routing and navigation, enabling smooth transitions between pages like login, dashboard, and task management views.
- **Axios**: A promise-based HTTP client used for making API requests to the backend, ensuring smooth and efficient communication between the frontend and backend.

### **Backend**
- **Node.js**: The runtime environment for executing JavaScript code server-side. It is lightweight, efficient, and scalable, ideal for building server-side applications.
- **Express**: A minimalist and flexible Node.js framework used to build the RESTful API that handles user authentication and task management.
- **CORS (Cross-Origin Resource Sharing)**: Middleware that allows the frontend (running on a different port) to interact with the backend API securely.
- **JWT (JSON Web Tokens)**: Used to authenticate users and manage sessions. JWT tokens are generated upon login and stored securely to authenticate future requests.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB, used for interacting with the MongoDB database. It simplifies querying and data manipulation.
- **Zod**: A TypeScript-first schema declaration and validation library used to validate inputs and ensure that user data is in the correct format before being processed by the server.

### **Database**
- **MongoDB**: A NoSQL database used to store user data and task information. MongoDB provides flexibility and scalability, allowing data to be stored in collections without a rigid schema.

---

## Installation and Setup

### Prerequisites
Ensure you have the following software installed on your system:
- **Node.js**: The JavaScript runtime required for both the backend and frontend.
- **MongoDB**: A NoSQL database for storing user and task data.

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
