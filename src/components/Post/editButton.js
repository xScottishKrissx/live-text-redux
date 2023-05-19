import React from 'react'
import { useSelector } from 'react-redux'

export default function EditButton({loggedIn, id, handleEdit}) {
    
    const cPanelVis = useSelector((state) => state.cPanelVis.value)
    const editModeState = useSelector((state) => state.edit.value)

    const toggleEditButton = editModeState.editing === false && editModeState.editId !== id

    console.log(cPanelVis)
    return (
        loggedIn && cPanelVis? 
            <>
                {toggleEditButton ? 
                    <button 
                        className='defaultBtnStyle editBtn' 
                        onClick={()=>handleEdit(!editModeState.editing, id)}>Edit Post
                    </button> 
                : null }
            </>
        : null 
    )
}
