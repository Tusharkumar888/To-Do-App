import axios from "axios";

export const ListComponent = ({ todos, setTodos }) => {

  //upade handeler 
  const handleUpdate = (todo, index) => (event) => {
    event.preventDefault();

    axios
      .put(
        "https://to-do-app-rose-ten.vercel.app/api/v1/user/todo",
        {
          taskId: todo.taskId, 
          title: todo.title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Update the specific todo in state
        setTodos((prevTodos) => {
          const updatedTodos = [...prevTodos];
          updatedTodos[index] = { ...updatedTodos[index], status: true }; // Update status
          return updatedTodos;
        });
        alert("Task successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Failed to update task. Please try again.");
      });
  };


  //detete handeler

  const handleDelete = (todo, index) => (event) => {
    event.preventDefault();
  
    axios
      .delete(
        `https://to-do-app-rose-ten.vercel.app/api/v1/user/todo?taskId=${todo.taskId}&title=${todo.title}`, // Use '&' to separate query params
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Update the state by removing the deleted todo
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
        alert("Task successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Failed to delete task. Please try again.");
      });
  };
  
  
  

  return (
    <>
      {todos.map((todo, index) => (
        <div
          key={todo._id} // Use a unique identifier for the key
          className={`md:w-[50%] w-[90%] flex items-center font-sans font-normal leading-10 text-2xl justify-between px-4 text-center rounded-md ${
            todo.priority === "high"
              ? "bg-[#FF6B6B]" // High priority
              : todo.priority === "medium"
              ? "bg-[#FFC857]" // Medium priority
              : "bg-[#A8D5BA]" // Low priority
          }`}
        >
          <div>{todo.title}</div>

          <div className="flex gap-4">
            <div onClick={handleUpdate(todo, index)}>
              {todo.status === true ? (
                <img
                  className="hover:scale-110 transition-all duration-300"
                  src="https://img.icons8.com/doodle/40/checked-checkbox.png"
                  alt="Completed"
                />
              ) : (
                <img
                  className="hover:scale-110 transition-all duration-300"
                  src="https://img.icons8.com/plasticine/40/hourglass.png"
                  alt="Pending"
                />
              )}
            </div>

            <div onClick={handleDelete(todo, index)}>
              <img
                className="hover:scale-110 transition-all duration-300"
                src="https://img.icons8.com/plasticine/40/trash--v1.png"
                alt="Delete"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
