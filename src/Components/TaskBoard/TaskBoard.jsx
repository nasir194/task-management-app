import { useState } from "react";
import { defaultTasks } from "../../utility/data";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(defaultTasks); // Initialize tasks with defaultTasks
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null); // State to hold the task to be edited
  // console.log(tasks);

  // for adding and editing tasks, we need the task object and a boolean to check if it's an add or edit operation
  // If it's an add operation, we need to create a new task object with a unique ID
  // If it's an edit operation, we need to find the task by ID and update it with the new values
  const handle_Add_Edit_Task = (newTask, isAdd) => {
    // Check if the task is being added or updated
    if (isAdd) {
      console.log(isAdd);
      const finalTask = { ...newTask, id: tasks.length + 1 };
      setTasks([...tasks, finalTask]);
    } // If it's an update, find the task by ID and update it
    else {
      console.log(isAdd);
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTasks(updatedTasks); // Update the tasks state with the updated task
    }
    // Close the modal after adding or editing a task
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId); // Filter out the task with the given ID
    setTasks(updatedTasks); // Update the tasks state with the filtered tasks
  };

  const handleDeleteAllTasks = () => {
    tasks.length = 0; // Clear the tasks array
    setTasks([...tasks]);
    console.log(tasks); // empty array, so TaskList will not render the table
  };

  const handleEditTask = (editTask) => {
    setTaskToUpdate(editTask);
    setShowModal(true); // Open the modal for editing
  };

  const handleCloseClick = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  const handleFav = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isFavorite: !task.isFavorite }; // Toggle the isFavorite property
      }
      return task; // Return the task unchanged if it doesn't match the ID
    });

    setTasks(updatedTasks);
  };

  const handleSearch = (searchTerm) => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filteredTasks]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal
          onAddEdit={handle_Add_Edit_Task}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}

      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* <-- Task Actions start --> */}
          <TaskActions
            onAddModal={() => setShowModal(true)}
            onDeleteAll={handleDeleteAllTasks}
          />
          {/* <-- Task Actions End --> */}

          {/* <!-- TaskList Table begin--> */}

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onFav={handleFav}
            />
          ) : (
            <NoTaskFound />
          )}

          {/* <!-- TaskList Table end--> */}
        </div>
      </div>
    </section>
  );
}
