import React from 'react'
// Redux
import { useSelector } from 'react-redux'
// Me
import SetColumnActive from './setColumnActive'
import HideColumn from './hideColumn'

// Style
import './ColumnItemControls.css'

export default function ColumnItemControls({editModeActive, colIsActive, handleSetActive, columnId, columnContent, hidden, handleHideColumn}) {

    const cPanelStyle = useSelector((state) => state.cPanelStyle.value)

    return (
        <div className='manageColumns-itemControls'>

            {editModeActive ? null :
                <SetColumnActive 
                    colIsActive={colIsActive}
                    handleSetActive={handleSetActive}
                    columnId={columnId}
                    columnContent={columnContent}
                />
            }
            {cPanelStyle ? 
                editModeActive ? null : 
                    <HideColumn 
                        hidden={hidden} 
                        columnId={columnId} 
                        handleHideColumn={handleHideColumn} 
                    /> 
                
            : null }
        
        </div>
    )
}
