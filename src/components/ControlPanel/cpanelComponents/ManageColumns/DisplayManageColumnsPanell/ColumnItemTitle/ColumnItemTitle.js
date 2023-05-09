import React from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../../../../features/cpanelVis'
// Me
// import ColumnTitleView from '../ColumnItemButtons/columnTitleView'
import ColumnTitleView from '../ColumnItemButtons/columnTitleView'
import AddNewButton from '../../../../../Utility/Buttons/addNewButton'
export default function ColumnItemTitle({
    editModeActive,
    columnContent,
    setColumnTitle,
    handleSetActive,
    columnId,
    activeLiveTextState,
}) {
    const dispatch = useDispatch()
    const cPanelVis = useSelector((state) => state.cPanelVis.value)

    const goToNewPostInput = (content, id) =>{
        dispatch(setCPanelVis(!cPanelVis))
        handleSetActive(id, content)
    }
  return (
    <div className={`${editModeActive ? 'manageColumns-columnTitle editTitle' : 'manageColumns-columnTitle' }`}>

        <ColumnTitleView
            editModeActive={editModeActive}
            columnContent={columnContent}
            setColumnTitle={setColumnTitle}
            handleSetActive={handleSetActive}
            columnId={columnId}
        />

        {/* Add New Post to this column */}
        <div className="manageColumns-addNewButton">
            {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null :
                editModeActive ? null : 
                    <AddNewButton 
                        title="Add New Post" 
                        handleClick={()=>goToNewPostInput(columnContent,columnId)} 
                    />
            }
        </div>
    </div>
  )
}
