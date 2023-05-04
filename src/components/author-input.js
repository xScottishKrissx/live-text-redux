import React from 'react'
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


  return (
    <>

      <div className='author-input-wrapper 1st '>
        <User  />
        
          <>
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
