import React, { useState } from 'react';
import './ToDo.css';

const ToDo = () => {
  // Define state to store the list of tasks.
  const [todos, setTodos] = useState([
    { text: 'Learn JavaScript', completed: true },
    { text: 'Learn React', completed: false },
    { text: 'Have a life!', completed: false }
  ]);

  // Define state to store new task input.
  const [newTodo, setNewTodo] = useState('');

  // Define state to store the current filter (All, Active, Completed).
  const [filter, setFilter] = useState('All');

  // Task addition function
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return; // Prevent empty tasks.

    // Add the new task to the current list.
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo(''); // Clear the input field.
  };

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter the task list based on the selected filter.
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // Show all for 'All'
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleAddTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    setTodos(
                      todos.map((item, idx) =>
                        idx === index ? { ...item, completed: !item.completed } : item
                      )
                    )
                  }
                />
                <label>{todo.text}</label>
                <button
                  className="destroy"
                  onClick={() =>
                    setTodos(todos.filter((_, idx) => idx !== index))
                  }
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.completed).length}</strong> items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filter === 'All' ? 'selected' : ''}
              onClick={() => handleFilterChange('All')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              className={filter === 'Active' ? 'selected' : ''}
              onClick={() => handleFilterChange('Active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              className={filter === 'Completed' ? 'selected' : ''}
              onClick={() => handleFilterChange('Completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          className="clear-completed"
          onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default ToDo;
