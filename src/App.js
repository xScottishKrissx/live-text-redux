import './App.css';

import {useSelector, useDispatch} from 'react-redux'
import {addItem} from './features/item'
import AuthorInput from './components/author-input';
import GlobalView from './components/global-view';
import ItemReview from './components/ItemReview/item-review';
// import ItemReviewEditPost from './components/ItemReview/item-review-edit-post';

function App() {
  
  const editModeState = useSelector((state) => state.edit.value)
  const newItem = useSelector((state) => state.items.value)
  const previewItem = useSelector((state) => state.preview.value)

  const dispatch = useDispatch()
  return (
    <div className="App">
      <div className="main-wrapper">
        
        <AuthorInput />

        <div className='right-column'>
          {/* {editModeState.editing ? <ItemReviewEditPost/> : <ItemReview /> } */}
          {editModeState.editing ? <ItemReview data={previewItem} /> : <ItemReview data={newItem} /> }
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
