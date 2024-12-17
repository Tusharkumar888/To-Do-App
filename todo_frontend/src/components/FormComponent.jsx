import axios from "axios";
import { useState } from "react";
import { TodoListComponent } from "./todoListComponent";

export const FormComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dates, setDates] = useState("");
  const [status, setStatus] = useState(false);
  const [todos,setTodos] = useState([])
  
  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!title || !description || !priority || !dates) {
      alert("Please fill out all fields.");
      return;
    }

    axios
      .post(
        "http://localhost:500/api/v1/user/todo",
        {
          taskId:  localStorage.getItem("taskId"),
          title,
          description,
          dueDate: dates,
          priority,
          status,
        },
        {
          headers: {
            Authorization:  `Bearer ${localStorage.getItem("token")}`,
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
          className=" md:w-[50%]  h-[5%] w-[90%] rounded px-2 border border-gray-600 "
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className=" md:w-[50%] w-[90%] h-[20%] border border-gray-600 rounded p-2 "
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

        <TodoListComponent todos={todos} setTodos={setTodos}></TodoListComponent>
      </form>
    </div>
  );
};
