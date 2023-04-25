import './App.css';
import {useSelector} from 'react-redux'
import AuthorInput from './components/author-input';
import ItemReview from './components/ItemReview/item-review';

import "../src/components/Utility/Buttons/buttons.css"
import Columns from './components/Column/Column';





function App() {
  // localStorage.clear()
  const editModeState = useSelector((state) => state.edit.value)
  const newItem = useSelector((state) => state.items.value)
  const previewItem = useSelector((state) => state.preview.value)



  return (
    <div className="App">





      <div className="main-wrapper">

        <AuthorInput />

        <div className='right-column'>
          {editModeState.editing ? <ItemReview data={previewItem} /> : <ItemReview data={newItem} /> }
          <Columns />
        </div>

      </div>
    </div>
  );
}

export default App;
