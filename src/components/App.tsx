import Todos from './Todos/todos';
import {Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <a target="_blank" className="text-lg pt-40 ml-8" href="https://github.com/mysteryven/todomvc-redux">点击查看源码</a>
      <div className="bg-white mx-auto mt-100 w-2/4">
        <Todos/>
      </div>
    </Provider>
  );
}

export default App;
