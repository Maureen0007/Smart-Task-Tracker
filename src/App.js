import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
});
  const [filter, setFilter] = useState('all');


// Save to localStorage
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);





  // 📦 Add a new task
  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

// 📝 Update state and clear input
    setTasks([...tasks, newTask]);
    setTask('');
  };

// 🗑️ Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

// ✅ Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🔍 Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
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
        {filteredTasks.map((t) => (
          <li key={t.id} className={`task-item ${t.completed ? 'completed' : ''}`}>
            <span className="task-text" onClick={() => toggleComplete(t.id)}>
              {t.text}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(t.id)}>
              🗑
            </button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </div>
    </div>
  );
}

export default App;
