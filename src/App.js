import './App.css';

import {useSelector, useDispatch} from 'react-redux'
import AuthorInput from './components/author-input';
import GlobalView from './components/global-view';
import ItemReview from './components/ItemReview/item-review';

function App() {
  
  const editModeState = useSelector((state) => state.edit.value)
  const newItem = useSelector((state) => state.items.value)
  const previewItem = useSelector((state) => state.preview.value)

  return (
    <div className="App">
      <div className="main-wrapper">
        
        <AuthorInput />

        <div className='right-column'>
          {editModeState.editing ? <ItemReview data={previewItem} /> : <ItemReview data={newItem} /> }
          <GlobalView />
        </div>

      </div>
    </div>
  );
}

export default App;
