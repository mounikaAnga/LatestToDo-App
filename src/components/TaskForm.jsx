import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks, updateTask, editingTask }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "", // Add description to state
    status: "todo",
    tags: [],
    index: null,
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        task: editingTask.task,
        description: editingTask.description || "", // Set description if editing
        status: editingTask.status,
        tags: editingTask.tags,
        index: editingTask.index,
      });
    } else {
      setTaskData({
        task: "",
        description: "",
        status: "todo",
        tags: [],
        index: null,
      });
    }
  }, [editingTask]);

  const checkTag = (tag) => taskData.tags.includes(tag);

  const selectTag = (tag) => {
    setTaskData((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.task.trim()) {
      return; // Optionally handle empty task input
    }
    if (taskData.index !== null && updateTask) {
      updateTask(taskData);
    } else {
      setTasks((prev) => [...prev, taskData]);
    }
    setTaskData({
      task: "",
      description: "",
      status: "todo",
      tags: [],
      index: null,
    });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
          aria-label="Task description"
        />
        <input
        type="text"
          name="description"
          value={taskData.description}
          className="task_description_input"
          placeholder="Enter task description"
          onChange={handleChange}
          aria-label="Task description"
        />
        <div className="task_form_bottom_line">
          <div className="tag_container">
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkTag("JavaScript")}
            />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkTag("React")}
            />
          </div>
          <div className="task_form_controls">
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
              aria-label="Task status"
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button
              type="submit"
              className="task_submit"
              aria-label={taskData.index !== null ? 'Update Task' : 'Add Task'}
            >
              {taskData.index !== null ? '+ Update Task' : '+ Add Task'}
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
