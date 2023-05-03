import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
// My Components
import ManageColumns from './cpanelComponents/manageColumns'
import { setActiveLiveText } from '../../features/activeLiveText'

import './controlPanel.css'
import { updateArray } from '../../features/live-text'
import ClearColumnsButton from './cpanelComponents/clearColumnsButton'
// import LoginLogoutButton from '../Utility/Buttons/loginLogoutButton'
// import User from '../User/User'
import { useEffect } from 'react'
import CPanelViewStyleButton from '../Utility/Buttons/cPanelViewStyleButton'

export default function ControlPanel({setControlPanelVis}) {
    // console.log(test)
    // Redux
    const dispatch = useDispatch()
    const activeLiveTextState = useSelector((state) => state.active.value) 
    const liveTextMaster = useSelector((state) => state.livetext.value)

    const [liveTexts, setLiveTexts] = useState(liveTextMaster)

    useEffect(()=>{
        setLiveTexts(liveTextMaster)
    },[liveTextMaster])

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
    const [columnTitle, setColumnTitle] = useState("")
    
    const minPostLength = 12
    const maxPostLength = 60

    const allowPost = postTitle.length >= minPostLength && postTitle.length <= maxPostLength
    const allowColumnTitle = columnTitle.length >= minPostLength && columnTitle.length <= maxPostLength



    const createNewColumn = () => {
        if(!allowPost) return
        const newColumn = {[uuidv4()]: {type:"Column", headline:postTitle, hidden:false, items:[], createdOn:Date.now()}}
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
    }

    // Change Column Headline
    const handleRenameColumn = (id) =>{
        const getColumn = liveTexts.filter(x => x[id])
        if( !allowColumnTitle)return
        const updateHeadline = {...getColumn[0][id], headline:columnTitle}
        updateColumns(id, updateHeadline)
     }

    //  Hide / Unhide Column
    const handleHideColumn = (id, currentHiddenStatus) =>{
        const getColumn = liveTexts.filter(x => x[id])
        const updateHeadline = {...getColumn[0][id], hidden: !currentHiddenStatus}
        updateColumns(id, updateHeadline)
    }

    const updateColumns = (id, updatedColumn) =>{
        const updateLiveTexts = liveTexts.map(x =>{ 
            if(x[id]){ return{ ...x, [id]: updatedColumn} }else{  return x  } 
        })
        setLiveTexts(updateLiveTexts)
        dispatch(updateArray(updateLiveTexts))
        localStorage.setItem("liveTextMaster", JSON.stringify(updateLiveTexts))  
    }



  return (
    <div className='confirm-post-overlay'> 

    <div className='control-panel-header-buttons'>
        <ClearColumnsButton clearColumns={clearColumns} />
        <CPanelViewStyleButton />
    </div>

        <ManageColumns 
            data={liveTexts} 
            allowPost={allowPost}   
            allowColumnTitle={allowColumnTitle}
            createNewLiveText={createNewColumn}
            activeLiveTextState={activeLiveTextState} 

            setControlPanelVis={setControlPanelVis} 
            setPostTitle={setPostTitle}
            setColumnTitle={setColumnTitle}

            handleSetActive={handleSetActive} 
            handleDeleteColumn={handleDeleteColumn}
            handleRenameColumn={handleRenameColumn} 
            handleHideColumn={handleHideColumn}
        />

        </div>
  )
}
