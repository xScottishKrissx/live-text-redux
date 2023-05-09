import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setCPanelVis } from '../../../../features/cpanelVis'
// import { removeTag } from '../../../Utility/removeTag'
// import cPanelInputStyle from '../../../../features/cPanelInputStyle'
// import AddNewButton from '../../../Utility/Buttons/addNewButton'
// import DeleteButton from '../../../Utility/Buttons/deleteButton'
// import Title from '../../../InputForm/Title'
// import EditColumnTitle from './editColumnTitle'
import ExtraInfo from './extraInfo/extraInfo'
// import ToggleExtraInfo from './extraInfo/toggleExtraInfo'
// import SetColumnActive from './ColumnItemControls/setColumnActive'
// import ColumnTitleView from './columnTitleView'
// import HideColumn from './ColumnItemControls/hideColumn'
import ColumnItemControls from './ColumnItemControls/ColumnItemControls'
import ColumnItemTitle from './ColumnItemTitle/ColumnItemTitle'
import ColumnItemButtons from './ColumnItemButtons/ColumnItemButtons'

export default function DisplayManageColumnsPanel({data, activeLiveTextState, handleSetActive, handleDeleteColumn, setColumnTitle, handleRenameColumn, allowColumnTitle, handleHideColumn}) {

    // const dispatch = useDispatch()
    // const cPanelVis = useSelector((state) => state.cPanelVis.value)
    // const cPanelStyle = useSelector((state) => state.cPanelStyle.value)
    // const liveTextMaster = useSelector((state) => state.livetext.value)
    

    
    // const goToNewPostInput = (content, id) =>{
    //     dispatch(setCPanelVis(!cPanelVis))
    //     handleSetActive(id, content)
    // }
    
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
                    {/* <div className='manageColumns-itemControls'>

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
                       
                    </div> */}
{/* Rename / Display Column Title */}
                        <ColumnItemTitle 
                            activeLiveTextState={activeLiveTextState}
                            columnContent={columnContent}
                            columnId={columnId}
                            editModeActive={editModeActive}
                            handleSetActive={handleSetActive}
                            setColumnTitle={setColumnTitle}
                        />
                        {/* <div className={`${editModeActive ? 'manageColumns-columnTitle editTitle' : 'manageColumns-columnTitle' }`}>

                            <ColumnTitleView
                                editModeActive={editModeActive}
                                columnContent={columnContent}
                                setColumnTitle={setColumnTitle}
                                handleSetActive={handleSetActive}
                                columnId={columnId}
                                activeLiveTextState={activeLiveTextState}
                                handleClick={()=>goToNewPostInput(columnContent,columnId)}
                                />
                            <div className="manageColumns-addNewButton">
                                {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null :
                                    editModeActive ? null : 
                                    <AddNewButton 
                                    title="Add New Post" 
                                    handleClick={()=>goToNewPostInput(columnContent,columnId)} 
                                    />
                                    
                                }
                            </div>
                        </div> */}

                            
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
                            {/* <div className={`${editModeActive ? 'manageColumns-column-buttons editTitle' : 'manageColumns-column-buttons' }`}>
                                {cPanelStyle ? 
                                <>
                                {editModeActive ? null : 
                                    <DeleteButton 
                                        title="Delete Column" 
                                        handleClick={()=>handleDeleteColumn(columnId)} 
                                    />
                            }
                                <EditColumnTitle 
                                    headline={headline}
                                    allowColumnTitle={allowColumnTitle}
                                    columnId={columnId}
                                    setEditMode={setEditMode}
                                    editMode={editMode}
                                    setColumnTitle={setColumnTitle}
                                    handleRenameColumn={handleRenameColumn}
                                    />
                                <ToggleExtraInfo 
                                    allowExtraInfoView={allowExtraInfoView}
                                    extraInfo={extraInfo}
                                    columnId={columnId}
                                />
                                    </>
                                : null }
                            </div> */}
                        </div>
                                
                        <ExtraInfo allowExtraInfoView={allowExtraInfoView} postCount={postCount} createdOn={createdOn}/>
                     </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
