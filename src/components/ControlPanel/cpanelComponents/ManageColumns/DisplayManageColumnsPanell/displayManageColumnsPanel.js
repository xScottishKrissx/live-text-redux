import React, { useState } from 'react'

// import ExtraInfo from '../DisplayManageColumnsPanel111/extraInfo/extraInfo'
import ExtraInfo from '../DisplayManageColumnsPanell/extraInfo/extraInfo'
import ColumnItemControls from './ColumnItemControls/ColumnItemControls'
import ColumnItemTitle from './ColumnItemTitle/ColumnItemTitle'
import ColumnItemButtons from '../DisplayManageColumnsPanell/ColumnItemButtons/ColumnItemButtons'

export default function DisplayManageColumnsPanel({data, activeLiveTextState, handleSetActive, handleDeleteColumn, setColumnTitle, handleRenameColumn, allowColumnTitle, handleHideColumn}) {

    
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
               const {headline, createdOn, hidden} = columnContent
               const postCount = columnContent.items.length

               const colIsActive = activeLiveTextState === columnId
               const allowExtraInfoView = extraInfoDisplay && extraInfoColId === columnId
                return(
                    <div 
                        className={`${allowExtraInfoView ? 'manageColumns-row extraInfoActive'  : 'manageColumns-row'}`} 
                        key={columnId} 
                        id={`${colIsActive ? "column-active" : "" }`}
                    >
                        <div className='manageColumns-column'  key={columnId}>
    {/* Set Column Active, Change UI for each column */}
                            <ColumnItemControls
                                columnId={columnId}
                                columnContent={columnContent}
                                colIsActive={colIsActive}

                                editModeActive={editModeActive}

                                hidden={hidden} 
                                handleSetActive={handleSetActive}
                                handleHideColumn={handleHideColumn} 
                            />

    {/* Rename / Display Column Title */}
                            <ColumnItemTitle 
                                activeLiveTextState={activeLiveTextState}
                                columnContent={columnContent}
                                columnId={columnId}
                                editModeActive={editModeActive}
                                handleSetActive={handleSetActive}
                                setColumnTitle={setColumnTitle}
                            />

                                
    {/* Control Panel Buttons */}
                            <ColumnItemButtons
                                allowColumnTitle={allowColumnTitle}
                                allowExtraInfoView={allowExtraInfoView}
                                
                                columnId={columnId}
                                
                                editMode={editMode}
                                editModeActive={editModeActive}
                                extraInfo={extraInfo}
                                
                                handleDeleteColumn={handleDeleteColumn}
                                handleRenameColumn={handleRenameColumn}
                                headline={headline}

                                setEditMode={setEditMode}
                                setColumnTitle={setColumnTitle}
                            />
                        </div>
                                
                        <ExtraInfo 
                            allowExtraInfoView={allowExtraInfoView} 
                            postCount={postCount} 
                            createdOn={createdOn}
                        />
                     </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
