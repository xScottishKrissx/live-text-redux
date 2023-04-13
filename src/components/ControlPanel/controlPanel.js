import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
// My Components
import ManageColumns from './cpanelComponents/manageColumns'
import { setActiveLiveText } from '../../features/activeLiveText'

import './controlPanel.css'
import { updateArray } from '../../features/live-text'
import ClearColumnsButton from '../Utility/Buttons/clearColumnsButton'
import LoginLogoutButton from '../Utility/Buttons/loginLogoutButton'

export default function ControlPanel({setControlPanelVis}) {
    
    // Redux
    const dispatch = useDispatch()
    const activeLiveTextState = useSelector((state) => state.active.value) 


    // const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const liveTextMaster = useSelector((state) => state.livetext.value)
    const [liveTexts, setLiveTexts] = useState(liveTextMaster)


    const clearColumns = () =>{
        localStorage.clear()
        window.location.reload()
    }

    const handleSetActive = (id) =>{
        dispatch(setActiveLiveText(id))
        localStorage.setItem("activeLiveText", JSON.stringify(id))
    }

    // Create a new live text / column
    const [postTitle, setPostTitle] = useState("")
    const minPostLength = 12
    const allowPost = postTitle.length >= minPostLength

    const createNewColumn = () => {
        if(!allowPost) return
        const newColumn = {[uuidv4()]: {type:"Column", headline:postTitle, items:[]}}
        const newColId = Object.entries(newColumn)[0][0]

        const addToMasterArray = liveTexts.concat(newColumn)
        setLiveTexts(addToMasterArray)
        dispatch(updateArray(addToMasterArray))
        // localStorage.setItem("liveTextMaster", JSON.stringify(addToMasterArray))
        
        setPostTitle("")
        handleSetActive(newColId)
    }

    // Delete Column
    const handleDeleteColumn = (id) =>{
        const deleteColumn = liveTexts.filter(x => !x[id])
        setLiveTexts(deleteColumn)
        dispatch(updateArray(deleteColumn))
        // localStorage.setItem("liveTextMaster", JSON.stringify(deleteColumn))
    }



  return (
    <div className='confirm-post-overlay'> 

    <div className='control-panel-header-buttons'>
        {/* <LoginLogoutButton /> */}
        <ClearColumnsButton clearColumns={clearColumns} />
    </div>

        <ManageColumns 
            data={liveTexts} 
            setControlPanelVis={setControlPanelVis} 
            handleSetActive={handleSetActive} 
            activeLiveTextState={activeLiveTextState} 
            handleDeleteColumn={handleDeleteColumn}
            createNewLiveText={createNewColumn}
            setPostTitle={setPostTitle}
            allowPost={allowPost}    
        />

        </div>
  )
}
