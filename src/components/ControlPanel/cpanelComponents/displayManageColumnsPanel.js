import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'
import { removeTag } from '../../Utility/removeTag'
import AddNewButton from '../../Utility/Buttons/addNewButton'
import { FaCheck, FaRegCircle} from 'react-icons/fa'
import DeleteButton from '../../Utility/Buttons/deleteButton'
import Title from '../../InputForm/Title'
import EditColumnTitle from './editColumnTitle'

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
    
    const displayManageColumnsPanel = Object.keys(data).map((i) =>{
        
        return(
            Object.entries(data[i]).map(([columnId, columnContent]) =>{
               const editModeActive = editing && editId === columnId
               const {headline} = columnContent
               console.log(columnContent.items.length)
               const postCount = columnContent.items.length
               
                return(
                    <div className='manageColumns-column' key={columnId}>
        
{/* Set Column Active, Change UI for each column */}
                        <div className='manageColumns-activeCheck'>{activeLiveTextState === columnId ? 
                            <span className='checkActiveButton' title="Column is active" id="colIsActive"><FaCheck /></span> 
                            : 
                            <span className='checkActiveButton' title="Set Column Active" onClick={()=>handleSetActive(columnId, columnContent)}><FaRegCircle /></span>
                            }
                        </div>
                       
{/* Change / Display Column Title */}
                        {editModeActive ? 
                            <Title 
                                field={removeTag(headline)} 
                                passNewFieldValue={setColumnTitle} 
                            />                
                        : 
                            <div 
                                onClick={()=>handleSetActive(columnId, columnContent)} className='manageColumns-headline'
                            >
                                {removeTag(headline)}
                            </div>
                        
                        }

                        <div className="manageColumns-postAmount">
                            <button className='defaultBtnStyle'> {postCount} {postCount > 0 ? "Posts" : "Post"}</button>
                        </div>
                            
{/* Control Panel Buttons */}
    {/* Add New Post to this column */}
                        <div className='manageColumns-column-buttons'>
                            {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null :   
                                <AddNewButton 
                                    title="Add New Post" 
                                    handleClick={()=>goToNewPostInput(columnContent,columnId)} 
                                />
                            }
    {/* Delete Column */}
                            <DeleteButton 
                                title="Delete Column" 
                                handleClick={()=>handleDeleteColumn(columnId)} 
                            />
    {/* Edit Column Title */}
                            <EditColumnTitle 
                                headline={headline}
                                allowColumnTitle={allowColumnTitle}
                                columnId={columnId}
                                setEditMode={setEditMode}
                                editMode={editMode}
                                setColumnTitle={setColumnTitle}
                                handleRenameColumn={handleRenameColumn}
                            />
                        </div>
        
                    </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
