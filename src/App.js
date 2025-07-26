import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
// Function to handle adding a new task
  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };
// Add the new task to the tasks array
    setTasks([...tasks, newTask]);
    setTask('');
  };
// Function to handle task deletion
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
// Function to toggle task completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Smart Task Tracker</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={`task-item ${t.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={() => toggleComplete(t.id)}>
              {t.text}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(t.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <button>Active</button>
        <button>Completed</button>
        <button>All</button>
      </div>
    </div>
  );
}

export default App;
