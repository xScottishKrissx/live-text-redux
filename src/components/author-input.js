import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'
import { setActiveLiveText } from '../features/activeLiveText'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'
import {v4 as uuidv4} from 'uuid'

import './author-input.css'


export default function AuthorInput() {
  const dispatch = useDispatch()
  const editModeState = useSelector((state) => state.edit.value)
  const activeLiveTextState = useSelector((state) => state.active.value)
  // console.log(activeLiveTextState)

  const [showOverlay, setOverlay] = useState(true)
  const handleEdit = (x) => dispatch(setEdit({editing:x, editId: null}))

  const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
  const [liveTexts, setLiveTexts] = useState(liveTextMaster)
  const [activeLiveText, setActiveLiveTextState] = useState()
  const createNewLiveText = () => {
    const newLiveText = {id:uuidv4(), content:[]}
    setLiveTexts(liveTexts.concat(newLiveText))
    localStorage.setItem("liveTextMaster", JSON.stringify(liveTexts))
  }

  const handleSetActive = (item) =>{
      dispatch(setActiveLiveText({item}))
  }

  const displayLiveTexts = liveTexts.map((x, index) => {
    // console.log(x)
    return (
      <div key={index}>
        {x.id} -- <button onClick={()=>handleSetActive(x)}>View</button>
      </div>
    )
  })
  // localStorage.clear()
  return (
    <>

      <div className='author-input-wrapper'>
      <button onClick={()=>setOverlay(true)}>Display Control Panel</button>
      {showOverlay === true ? 
      <div className='confirm-post-overlay'> 
        <button onClick={()=>localStorage.clear()}>Clear</button>
        <h1>Post Added</h1>
        
        <h3>Create New Post?</h3>
        <button onClick={()=>setOverlay(false)}>Create New Post</button> 
        
        <h3>View Public View</h3>
        <button onClick={()=>setOverlay(false)}>Show Public View</button> 

        <h3>Loggout</h3>
        <button>Logout</button>

        <h4>Create Live Text</h4>
        
        <button onClick={createNewLiveText}>Create</button>
        {/* <h4>Active Live Text - {activeLiveText}</h4> */}

        <h4>Manage Live Texts</h4>
        {displayLiveTexts}

      </div>
    :
      <>
        {editModeState.editing ? 
          <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
          :
          <NewPost 
             
            handleEdit={handleEdit} 
            confirmPost={()=>setOverlay(!showOverlay)} 
          />
        }
      </>
      }
      </div>
    </>
  )
}
