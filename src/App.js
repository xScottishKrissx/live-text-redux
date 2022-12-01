import './App.css';

import {useSelector, useDispatch} from 'react-redux'
import {addItem} from './features/item'

function App() {
  const itemList = useSelector((state) => state.items.value)
  console.log(itemList)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <h1>Live Text</h1>
      <p>{itemList}</p>
      <button onClick={()=>{dispatch(addItem("New Item :) "))}}>Add Item</button>
    </div>
  );
}

export default App;
