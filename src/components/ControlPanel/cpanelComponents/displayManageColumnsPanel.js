import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'
import { removeTag } from '../../Utility/removeTag'
import AddNewButton from '../../Utility/Buttons/addNewButton'
import { FaCheck, FaRegCircle, FaEdit, FaSave, FaUndo } from 'react-icons/fa'
import DeleteButton from '../../Utility/Buttons/deleteButton'
import Title from '../../InputForm/Title'

export default function DisplayManageColumnsPanel({data, activeLiveTextState, handleSetActive, handleDeleteColumn, setColumnTitle, handleRenameColumn, allowColumnTitle, }) {

    const dispatch = useDispatch()
    const cPanelVis = useSelector((state) => state.cPanelVis.value)

    const goToNewPostInput = (content, id) =>{
        dispatch(setCPanelVis(!cPanelVis))
        handleSetActive(id, content)
    }

    const [editMode, setEditMode] = useState({
        editId:"",
        editing:false
    })
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
    
    const displayManageColumnsPanel = Object.keys(data).map((i) =>{
        return(
            Object.entries(data[i]).map(([columnId, columnContent]) =>{
               const editModeActive = editing && editId === columnId
               const {headline} = columnContent
               
                return(
                    <div className='manageColumns-column' key={columnId}>
        
                        <div className='manageColumns-activeCheck'>{activeLiveTextState === columnId ? 
                            <span className='checkActiveButton' title="Column is active" id="colIsActive"><FaCheck /></span> 
                            : 
                            <span className='checkActiveButton' title="Set Column Active" onClick={()=>handleSetActive(columnId, columnContent)}><FaRegCircle /></span>
                            }
                        </div>
                       

                        {editModeActive ? 
                            <Title  field={removeTag(headline)} passNewFieldValue={setColumnTitle} />                
                        : 
                            <div onClick={()=>handleSetActive(columnId, columnContent)} className='manageColumns-headline'>{removeTag(headline)}</div>
                        
                        }
                            
            
                        <div className='manageColumns-column-buttons'>
                            {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null :   
                                <AddNewButton title="Add New Post" handleClick={()=>goToNewPostInput(columnContent,columnId)} />
                            }

                            <DeleteButton title="Delete Column" handleClick={()=>handleDeleteColumn(columnId)} />


                            {editModeActive ? 
                            <div className='editButtonWrapper editActive'>
                                <button className='defaultBtnStyle marginLeft0' title="Cancel Name Change" onClick={()=>handleUndo(headline)}><FaUndo /></button>
                                {/* Change UI if tile is too short/long */}
                                {allowColumnTitle ? 
                                    <button className='defaultBtnStyle marginRight0' title="Confirm Name Change" onClick={()=>handleRename(columnId)}><FaSave /></button>
                                    : 
                                    <button className='defaultBtnStyle greyOut marginRight0' title="Error"><FaSave /></button>
                                }

                            </div>
                            
                            :
                            <button onClick={()=>startRename(columnId, headline)} title="Rename Column" className='defaultBtnStyle'><FaEdit/></button>
                            }
                        </div>
        
                    </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
