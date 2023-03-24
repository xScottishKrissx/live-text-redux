import React,{useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
// My Components
import ManageColumns from './cpanelComponents/manageColumns'
import { setActiveLiveText } from '../../features/activeLiveText'
import Title from '../InputForm/Title'

import './controlPanel.css'

export default function ControlPanel({setControlPanelVis}) {
    
    // Redux
    const dispatch = useDispatch()
    const activeLiveTextState = useSelector((state) => state.active.value) 


    const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const [liveTexts, setLiveTexts] = useState(liveTextMaster)
    // console.log(liveTextMaster)

    const clearColumns = () =>{
        localStorage.clear()
        window.location.reload()
      }

    const handleSetActive = (x) =>{
        dispatch(setActiveLiveText(x))
        localStorage.setItem("activeLiveText", JSON.stringify(x))
    }

    // Create a new live text / column
    const [postTitle, setPostTitle] = useState("")
    const createNewLiveText = () => {
        const newColumn = {[uuidv4()]: {type:"Column", headline:postTitle, items:[]}}
        const addToMasterArray = liveTexts.concat(newColumn)
        setLiveTexts(addToMasterArray)
        localStorage.setItem("liveTextMaster", JSON.stringify(addToMasterArray))
    }

    // Delete Column
    const handleDeleteColumn = (id) =>{
        const deleteColumn = liveTexts.filter(x => !x[id])
        setLiveTexts(deleteColumn)
        localStorage.setItem("liveTextMaster", JSON.stringify(deleteColumn))
    }



  return (
    <div className='confirm-post-overlay'> 
        <button onClick={clearColumns}>Clear</button>
            
        <h3>Logout - <button>Logout</button> </h3>

        <Title passNewFieldValue={setPostTitle}/>
        <h3>Manage Live Texts - <button onClick={createNewLiveText}>Create New</button> </h3>
        
        
        <h4>Active Live Text - {activeLiveTextState}</h4>

        <ManageColumns 
            data={liveTexts} 
            setControlPanelVis={setControlPanelVis} 
            handleSetActive={handleSetActive} 
            activeLiveTextState={activeLiveTextState} 
            handleDeleteColumn={handleDeleteColumn}
        />
  </div>
  )
}
