import Todos from './Todos/todos';
import { Provider } from 'react-redux'
import store from './store';


function App() {
  return (
    <Provider store={store} >
    <div className="bg-white mx-auto mt-100 w-2/4">
     <Todos />
    </div>
    </Provider>
  )
}

export default App
