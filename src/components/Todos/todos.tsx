import Todo from './todo';

import {useAppDispatch, useAppSelector} from '../store';
import {add, changeTab, getTodos, Tab, TodoItem} from '../todoSlice';
import React, {ReactElement, useState} from 'react';

let count = 10;
const getId = () => {
  return count++;
};

const ENTER_KEY = 'ENTER';

const Todos = () => {
  const [value, setValue] = useState('');
  const todos = useAppSelector(getTodos);
  const tab = useAppSelector(state => state.todo.tab);
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

  let filterTodos: TodoItem[];

  if (tab === 'active') {
    filterTodos = todos.filter(i => !i.done);
  } else if (tab === 'completed') {
    filterTodos = todos.filter(i => i.done);
  } else {
    filterTodos = todos;
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
          <ul className="todo-list">
            {
              filterTodos.map(todo => (
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
              <SwitchTab thisTab="all" >All</SwitchTab>
            </li>
            <span> </span>
            <li>
              <SwitchTab thisTab="active">Active</SwitchTab>
            </li>
            <span> </span>
            <li>
              <SwitchTab thisTab="completed">Completed</SwitchTab>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
};

function SwitchTab({thisTab, children}: { thisTab: Tab, children: ReactElement | string }) {
  const tab = useAppSelector(state => state.todo.tab);
  const dispatch = useAppDispatch();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    dispatch(changeTab(thisTab));
  }

  return (
    <a onClick={handleClick} className={thisTab === tab ? 'selected' : ''}>{children}</a>
  );
}

export default Todos;
