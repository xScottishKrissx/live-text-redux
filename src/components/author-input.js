import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import User from './User/User'
import PostControlBar from './PostControl/PostControlComponents/PostControlBar'
import ControlPanel from './ControlPanel/controlPanel'
import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'

export default function AuthorInput() {
  const dispatch = useDispatch()
  /////// Handle Edit
  const editModeState = useSelector((state) => state.edit.value)
  const cPanelVisState = useSelector((state) => state.cPanelVis.value)

  const handleEdit = (x) => dispatch(setEdit({editing:x, editId: null})) 

  const [toggle, setToggle] = useState(false)
  return (
    <>

      <div 
        className={`${toggle ? 'left-column author-input-wrapper expand' : 'left-column author-input-wrapper '}`}>
        {/* <User/> */}
        
          <>
          <h2 onClick={()=>setToggle(!toggle)} className='defaultBtnStyle colTitle'><p>Control Panel</p></h2>
          <PostControlBar />

          {cPanelVisState === true ? 
            // Control Panel Is Visible
            <ControlPanel  />
            :
            <>
            {editModeState.editing ? 
              // Edit Post View
              <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
              :
              // Adding New Post
              <NewPost handleEdit={handleEdit} />
            }
            </>
          }


          </>
        
      </div>
    </>
  )
}
