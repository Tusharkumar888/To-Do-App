import axios from "axios";
import { useState,useEffect } from "react";
import {TodoListComponent} from "./todoListComponent";


export const FormComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dates, setDates] = useState("");
  const [status, setStatus] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://to-do-app-rose-ten.vercel.app/api/v1/user/todo", 
          {
            params: {
              taskId: localStorage.getItem("taskId"), // Use query params to send taskId
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
            },
          }
        );
  
        if (response.data && response.data.length > 0) {
          setTodos(response.data); // If data is present, update the todos state
        } else {
          setTodos([]); // If no data, set todos to an empty array
        }
      } catch (err) {
        console.log(err.message); // Log any errors
      }
    };
  
    fetchTodos(); // Call the fetchTodos function when the component mounts
  }, []);
  
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !description || !priority || !dates) {
      alert("Please fill out all fields.");
      return;
    }

    axios
      .post(
        "https://to-do-app-rose-ten.vercel.app/api/v1/user/todo",
        {
          taskId: localStorage.getItem("taskId"),
          title,
          description,
          dueDate: dates,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data.todo]);
        alert("Task successfully created!");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        alert("Failed to create task. Please try again.");
      });
  };

  return (
    <div className="w-screen h-full ">
      <form
        onSubmit={handleSubmit}
        className="w-screen h-full relative flex flex-col items-center pt-10 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className=" md:w-[50%]  h-[40px] w-[90%] rounded px-2 border border-gray-600 "
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className=" md:w-[50%] w-[90%] h-[100px] border border-gray-600 rounded p-2 "
        />
        <div className="md:w-[50%] w-[90%] flex justify-between">
          <select
            name="priority"
            placeholder="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-[40%] p-2 rounded border border-gray-600 cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-[40%]  p-2 rounded border border-gray-600 cursor-pointer"
          />

          <button
            type="submit"
            className="hover:scale-110 transition-all duration-300"
          >
            <img src="https://img.icons8.com/plasticine/60/add--v1.png" />
          </button>
        </div>

        <TodoListComponent
          todos={todos}
          setTodos={setTodos}
        ></TodoListComponent>
      </form>
    </div>
  );
};
