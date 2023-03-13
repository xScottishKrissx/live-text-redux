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

      <div className='author-input-wrapper'>
      {showOverlay === true ? 
      <div className='confirm-post-overlay'> 
        <h1>Post Added</h1>
        
        <h3>Create New Post?</h3>
        <button onClick={()=>setOverlay(false)}>Create New Post</button> 
        
        <h3>View Public View</h3>
        <button onClick={()=>setOverlay(false)}>Show Public View</button> 

        <h3>Loggout</h3>
        <button>Logout</button>

        <h4>Delete Live Text</h4>
        <button>Delete</button>
      </div>
    :
      <>
        {editModeState.editing ? 
          <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
          :
          <NewPost handleEdit={handleEdit} confirmPost={confirmPost} />
        }
        </>
      }
      </div>
    </>
  )
}
