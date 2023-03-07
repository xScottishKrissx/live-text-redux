import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'

export default function AuthorInput() {
  const dispatch = useDispatch()

  const editModeState = useSelector((state) => state.edit.value)

  const handleEdit = (x) => dispatch(setEdit({editing:x, editId: null}))

  return (
    <div className='author-input-wrapper'>

      {editModeState.editing ? 
        <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
      :
        <NewPost handleEdit={handleEdit}/>
      }
      
    </div>
  )
}
