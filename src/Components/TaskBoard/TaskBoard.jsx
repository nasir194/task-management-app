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
  console.log(tasks);

  const handleAddTask = (newTask) => {
    const finalTask = { ...newTask, id: tasks.length + 1 };
    setTasks([...tasks, finalTask]); // Add the new task to the existing tasks
    setShowModal(false); // Close the modal after saving
    // setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the existing tasks
    // Assign a new ID based on the current length of tasks
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

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal onAdd={handleAddTask} taskToUpdate={taskToUpdate} />
      )}

      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask />
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
