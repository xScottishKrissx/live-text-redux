import React,{useState} from 'react'
import { FaUndo, FaSave, FaEdit } from 'react-icons/fa'
export default function EditColumnTitle({
    allowColumnTitle,
    columnId,
    headline,
    setEditMode,
    editMode,
    setColumnTitle,
    handleRenameColumn

}) {

    const {editing, editId} = editMode

    const startRename = (x, currentHeadline) =>{
        setEditMode({editId:x, editing:!editing})
        setColumnTitle(currentHeadline)
    }

    const handleRename = (columnId) =>{
        handleRenameColumn(columnId)
        setEditMode({editId:"", editing:!editing})
    }

    const handleUndo = (currentHeadline) =>{
        setColumnTitle(currentHeadline)
        setEditMode({editId:"", editing:!editing})
    }

    const editModeActive = editing && editId === columnId

  return (
    <>
    {editModeActive ? 
        <div className='editButtonWrapper editActive'>
{/* Undo rename and close the rename function */}
            <button 
                className='defaultBtnStyle marginLeft0' 
                title="Cancel Name Change" 
                onClick={()=>handleUndo(headline)}
            >
                <FaUndo />
            </button>

{/* Change UI if title is too short/long */}
{/* Change the UI if the column title can be posted, then allow the change to happen */}
            {allowColumnTitle ? 
                <button 
                    className='defaultBtnStyle marginRight0' 
                    title="Confirm Name Change" 
                    onClick={()=>handleRename(columnId)}
                >
                    <FaSave />
                </button>
                : 
                <button className='defaultBtnStyle greyOut marginRight0' title="Error"><FaSave /></button>
            }

        </div>
    
    :
// Display the rename buttons above
        <button onClick={()=>startRename(columnId, headline)} title="Rename Column" className='defaultBtnStyle'><FaEdit/></button>
    }
    </>
  )
}
