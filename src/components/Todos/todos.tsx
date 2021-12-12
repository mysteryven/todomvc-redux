import Todo from './todo';

import {useAppDispatch, useAppSelector} from '../store';
import {add, getTodos} from '../todoSlice';
import React, {useState} from 'react';

let count = 10;
const getId = () => {
  return count++;
};

const ENTER_KEY = 'ENTER';

const Todos = () => {
  const [value, setValue] = useState('');
  const todos = useAppSelector(getTodos);
  const dispatch = useAppDispatch();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code.toUpperCase() !== ENTER_KEY) {
      return;
    }

    dispatch(add({
      content: value,
      done: false,
      mode: 'view',
      id: getId()
    }));
  }


  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
                 onChange={(e) => setValue(e.target.value)}
                 onKeyDown={(e) => handleKeyDown(e)}
                 autoFocus
                 value={value}
          />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox"/>
          <label htmlFor="toggle-all"/>
          <ul className="todo-list">
            {
              todos.map(todo => (
                <Todo key={todo.id} item={todo}/>
              ))
            }
          </ul>
        </section>
        <footer className="footer h-10">
          <span className="todo-count">
            <strong>{todos.filter(i => !i.done).length}</strong>
            <span> items left</span>
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>
            <span> </span>
            <li>
              <a href="#/active" className="">Active</a>
            </li>
            <span> </span>
            <li>
              <a href="#/completed" className="">Completed</a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
};

export default Todos;
