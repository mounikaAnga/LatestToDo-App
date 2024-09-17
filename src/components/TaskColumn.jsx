import React from "react";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";
// const TaskColumn=(props)=>{

const TaskColumn = ({ title, icon, tasks, status, handleEdit, handleDelete, setActiveCard, onDrop,activeCard }) => {

  const handleDrop = (e) => {
    e.preventDefault();
    const position = e.dataTransfer.getData("position");
    onDrop(status, parseInt(position, 10));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("position", index);
    setActiveCard(index); // Set the card as active
  };

  const handleDragEnd = () => {
    setActiveCard(null); // Remove the active card on drag end
  };

  return (
  
    <div
      className="task_column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <header className="task_column_heading">
   
        <img  className="task_column_icon" src={icon} alt={`${title} icon`}  />
        <h2>{title}</h2>
      </header>
      <div className="cards_container">
        {tasks
          .filter(task => task.status === status)
          .map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              title={task.title}
              description={task.description}
              tags={task.tags}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              setActiveCard={setActiveCard}
              isActive={index === activeCard}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskColumn;