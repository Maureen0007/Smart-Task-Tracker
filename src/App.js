import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

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

  // Function to filter tasks based on completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

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
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={() => toggleComplete(task.id)}>
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(task.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <button className={filter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}>Active
          </button>
          
        <button className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}>Completed
          </button>
        <button className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}>All
          </button>
      </div>
    </div>
  );
}

export default App;
