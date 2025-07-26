import React, {useState} from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '')
      return;
    // Add the task to the list
    
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };
    // Update the state with the new task
      setTasks([...tasks, newTask]);
      setTask('');
    
  };

  return(
    <div className="app-container">
      <h1>Smart Task Tracker</h1>
      <div>
        <input 
          type="text" 
          value={task} 
          placeholder="Add a new task..." 
          onChange={(e) => setTask(e.target.value)} 
          
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className='task-item'>
            <span className='task-text'>{task.text}</span>
            <button className='delete-btn'>🗑</button>
            </li>
        ))}
      </ul>

      <div className="filters">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
    </div>
  );

};

export default App