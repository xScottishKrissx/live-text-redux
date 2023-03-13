import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import { setForm } from '../features/resetForm'

import './author-input.css'

export default function AuthorInput() {
  const dispatch = useDispatch()

  const editModeState = useSelector((state) => state.edit.value)
  const handleEdit = (x) => {
   
    dispatch(setEdit({editing:x, editId: null}))
  }

  const [showOverlay, setOverlay] = useState(false)
  const confirmPost = () =>{
    console.log("Handle New Post")
    setOverlay(true)
  }

  // console.log(editModeState.editing)



  return (
    <>
    {
      showOverlay === true ? 

      <div>
        <button onClick={()=>setOverlay(false)}>New Post</button>
      </div>
  :
    <div className='author-input-wrapper'>
      {editModeState.editing ? 
        <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
        :
        <NewPost handleEdit={handleEdit} confirmPost={confirmPost} />
      }

    </div>
        
      
      }
      </>
  )
}
