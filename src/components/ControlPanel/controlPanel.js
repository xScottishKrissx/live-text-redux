import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
// My Components
import ManageColumns from './cpanelComponents/manageColumns'
import { setActiveLiveText } from '../../features/activeLiveText'

export default function ControlPanel({setControlPanelVis}) {
    
    // Redux
    const dispatch = useDispatch()
    const activeLiveTextState = useSelector((state) => state.active.value) 


    const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const [liveTexts, setLiveTexts] = useState(liveTextMaster)

    const clearColumns = () =>{
        localStorage.clear()
        window.location.reload()
      }

    const handleSetActive = (x) =>{
        dispatch(setActiveLiveText(x))
        localStorage.setItem("activeLiveText", JSON.stringify(x))
    }

        // Create a new live text / column
    const createNewLiveText = () => {
        const newColumn = {[uuidv4()]: {type:"Column", items:[]}}
        const addToMasterArray = liveTexts.concat(newColumn)
        setLiveTexts(addToMasterArray)
        localStorage.setItem("liveTextMaster", JSON.stringify(addToMasterArray))
    }

  return (
    <div className='confirm-post-overlay'> 
        <button onClick={clearColumns}>Clear</button>
            
        <h3>Logout - <button>Logout</button> </h3>
        <h3>Manage Live Texts - <button onClick={createNewLiveText}>Create New</button> </h3>
        <h4>Active Live Text - {activeLiveTextState}</h4>

        <ManageColumns 
            data={liveTexts} 
            setControlPanelVis={setControlPanelVis} 
            handleSetActive={handleSetActive} 
            activeLiveTextState={activeLiveTextState} 
        />
  </div>
  )
}
