import React from 'react'
// Redux
import { useSelector } from 'react-redux'
// Me
import DeleteButton from '../../../../Utility/Buttons/deleteButton'
import EditColumnTitle from '../editColumnTitle'
import ToggleExtraInfo from '../extraInfo/toggleExtraInfo'
// Style
import './ColumnItemButtons.css'

export default function ColumnItemButtons({
    headline,
    allowColumnTitle,
    columnId,
    setEditMode,
    editMode,
    setColumnTitle,
    handleRenameColumn,
    allowExtraInfoView,
    extraInfo,
    editModeActive,
    handleDeleteColumn
}) {
    const cPanelStyle = useSelector((state) => state.cPanelStyle.value)

  return (
    <div className={`${editModeActive ? 'manageColumns-column-buttons editTitle' : 'manageColumns-column-buttons' }`}>
    {/* Delete Column */}
        {cPanelStyle ? 
        <>
        {editModeActive ? null : 
            <DeleteButton 
                title="Delete Column" 
                handleClick={()=>handleDeleteColumn(columnId)} 
            />
    }
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
            </>
        : null }
    </div>
                    
  )
}
