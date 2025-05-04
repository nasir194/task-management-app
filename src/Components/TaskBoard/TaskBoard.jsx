import { useState } from "react";
import { defaultTasks } from "../../utility/data";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(defaultTasks); // Initialize tasks with defaultTasks
  console.log(tasks);

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* <!-- Search Box --> */}
        <SearchTask />
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* <-- Task Actions start --> */}
          <TaskActions />
          {/* <-- Task Actions End --> */}

          {/* <!-- TaskList Table begin--> */}
          <TaskList tasks={tasks} />
          {/* <!-- TaskList Table end--> */}
        </div>
      </div>
    </section>
  );
}
