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
  /////// Handle Edit
  const editModeState = useSelector((state) => state.edit.value)
  const [showOverlay, setOverlay] = useState(true)
  const handleEdit = (x) => dispatch(setEdit({editing:x, editId: null}))


  ////// Handle Live Texts
  const activeLiveTextState = useSelector((state) => state.active.value.id)
  const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
  const [liveTexts, setLiveTexts] = useState(liveTextMaster)
  console.log(liveTexts)

  // Create a new live text / column
  const createNewLiveText = () => {
    // const newLiveText = {id:uuidv4(), content:[]}
    const newColumn = {[uuidv4()]: {name:"placeholder", items:[]}}
    const addToMasterArray = liveTexts.concat(newColumn)
    setLiveTexts(addToMasterArray)
    localStorage.setItem("liveTextMaster", JSON.stringify(addToMasterArray))
  }

  // Set a live text as the current active live text (the one new posts will be added to.)
  const handleSetActive = (x) =>{
      console.log(x)
      dispatch(setActiveLiveText(x))
      localStorage.setItem("activeLiveText", JSON.stringify(x))
  }

  // Display the list of available live texts / columns
  const displayLiveTexts = Object.keys(liveTexts).map((key, i) =>{
    return(
      Object.entries(liveTexts[i]).map(([columnId, columnContent]) =>{
        return(
          <div key={columnId}>
            {columnContent.name}-{columnId}
          </div>
        )
      })
    )
  })
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
        <h4>Active Live Text - {activeLiveTextState}</h4>

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
