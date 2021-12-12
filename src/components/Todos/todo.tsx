import {ChangeEvent, FunctionComponent} from 'react';
import {edit, remove, switchMode, TodoItem, toggle} from '../todoSlice';
import {useAppDispatch} from '../store';
import classnames from 'classnames';


interface TodoProps {
  item: TodoItem
}

const Todo: FunctionComponent<TodoProps> = (props) => {
  const {item} = props;
  const dispatch = useAppDispatch();

  function handleInputChecked(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    dispatch(toggle({
      done: isChecked,
      id: item.id
    }));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const content = e.target.value;
    dispatch(edit({
      content,
      id: item.id
    }));
  }

  function handleClick() {
    dispatch(remove(item.id));
  }

  function handleDoubleClick() {
    dispatch(switchMode({
      id: item.id,
      mode: 'edit'
    }));
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    dispatch(switchMode({
      id: item.id,
      mode: 'view'
    }));

    dispatch(edit({
      id: item.id,
      content: e.target.value
    }))
  }

  return (
    <li className={classnames({
      completed: item.done,
      editing: item.mode === 'edit'
    })}
    >
      <div className="view">
        <input className="toggle" type="checkbox" onChange={handleInputChecked} checked={item.done}/>
        <label onDoubleClick={handleDoubleClick}>{item.content}</label>
        <button onClick={handleClick} className="destroy"/>
      </div>
      <input className="edit" onChange={handleChange} onBlur={handleBlur} value={item.content}/>
    </li>
  );
};

export default Todo;
