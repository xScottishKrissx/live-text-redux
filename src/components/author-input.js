import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'
import ControlPanel from './ControlPanel/controlPanel'


export default function AuthorInput() {
  const dispatch = useDispatch()
  /////// Handle Edit
  const editModeState = useSelector((state) => state.edit.value)
  const [showControlPanel, setControlPanelVis] = useState(true)
  const handleEdit = (x) => dispatch(setEdit({editing:x, editId: null}))

  return (
    <>

      <div className='author-input-wrapper'>
        <button onClick={()=>setControlPanelVis(true)}>Go to Control Panel</button>
        {showControlPanel === true ? 
            <ControlPanel setControlPanelVis={setControlPanelVis} />
          :
            <>
              {editModeState.editing ? 
                <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
                :
                <NewPost handleEdit={handleEdit} confirmPost={()=>setControlPanelVis(!showControlPanel)} />
              }
            </>
        }
      </div>
    </>
  )
}
