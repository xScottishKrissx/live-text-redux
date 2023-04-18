import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'
import { removeTag } from '../../Utility/removeTag'
import AddNewButton from '../../Utility/Buttons/addNewButton'
import DeleteButton from '../../Utility/Buttons/deleteButton'
import Title from '../../InputForm/Title'
import EditColumnTitle from './editColumnTitle'
import ExtraInfo from './extraInfo/extraInfo'
import ToggleExtraInfo from './extraInfo/toggleExtraInfo'
import SetColumnActive from './setColumnActive'
import ColumnTitleView from './columnTitleView'

export default function DisplayManageColumnsPanel({data, activeLiveTextState, handleSetActive, handleDeleteColumn, setColumnTitle, handleRenameColumn, allowColumnTitle, }) {

    const dispatch = useDispatch()
    const cPanelVis = useSelector((state) => state.cPanelVis.value)
    
    const goToNewPostInput = (content, id) =>{
        dispatch(setCPanelVis(!cPanelVis))
        handleSetActive(id, content)
    }
    
    // SHow Extra Information
    const [showExtraInfo, setShowExtraInfo] = useState({
        extraInfoDisplay:false,
        extraInfoColId:""
    })
    const {extraInfoDisplay, extraInfoColId} = showExtraInfo
    const extraInfo = (id, toggle) =>{
        setShowExtraInfo({extraInfoDisplay: toggle, extraInfoColId:id})
    }

    // Show Edit Title Mode
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
               const postCount = columnContent.items.length

               const colIsActive = activeLiveTextState === columnId
               const allowExtraInfoView = extraInfoDisplay && extraInfoColId === columnId
                return(
                    <div className={`${allowExtraInfoView ? 'manageColumns-row extraInfoActive' : 'manageColumns-row'}`} key={columnId}>
                        <div className='manageColumns-column' key={columnId}>


{/* Set Column Active, Change UI for each column */}
                        <SetColumnActive 
                            colIsActive={colIsActive}
                            handleSetActive={handleSetActive}
                            columnId={columnId}
                            columnContent={columnContent}
                        />

                       
{/* Rename / Display Column Title */}
                        <ColumnTitleView
                            editModeActive={editModeActive}
                            columnContent={columnContent}
                            setColumnTitle={setColumnTitle}
                            handleSetActive={handleSetActive}
                            columnId={columnId}
                        />

                            
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
        {/* Show Extra Information */}
                                <ToggleExtraInfo 
                                    allowExtraInfoView={allowExtraInfoView}
                                    extraInfo={extraInfo}
                                    columnId={columnId}
                                />
                            </div>
                        </div>
                                
                        <ExtraInfo allowExtraInfoView={allowExtraInfoView} postCount={postCount} />
                     </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
