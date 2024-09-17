import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [editingTask, setEditingTask] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, { ...taskToMove, status });
    setTasks(updatedTasks);
  };

  const handleEdit = (taskIndex) => {
    const taskToEdit = tasks[taskIndex];
    setEditingTask({ ...taskToEdit, index: taskIndex });
  };

  const updateTask = (updatedTask) => {
    const newTasks = tasks.map((task, index) =>
      index === updatedTask.index ? updatedTask : task
    );
    setTasks(newTasks);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} updateTask={updateTask} editingTask={editingTask} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          activeCard={activeCard}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          activeCard={activeCard}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          activeCard={activeCard}
        />
      </main>
    </div>
  );
};

export default App;
