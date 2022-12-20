import './App.css';

import {useSelector, useDispatch} from 'react-redux'
import {addItem} from './features/item'
import AuthorInput from './components/author-input';
import GlobalView from './components/global-view';
import ItemReview from './components/ItemReview/item-review';

function App() {
  const itemList = useSelector((state) => state.items.value)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div className="main-wrapper">
        
        <AuthorInput />

        <div className='right-column'>
          <ItemReview />
          <GlobalView />
        </div>

      </div>
      {/* <h1>Live Text</h1>
      <p>{itemList}</p>
      <button onClick={()=>{dispatch(addItem("New Item :) "))}}>Add Item</button> */}
    </div>
  );
}

export default App;
