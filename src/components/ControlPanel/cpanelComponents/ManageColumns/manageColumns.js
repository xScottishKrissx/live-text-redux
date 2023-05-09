import React,{useState} from 'react'
import Title from '../../../InputForm/Title'
import DisplayManageColumnsPanel from './DisplayManageColumnsPanell/displayManageColumnsPanel'

import './manageColumns.css'

export default function ManageColumns({
  activeLiveTextState, 
  allowColumnTitle, 
  allowPost, 
  createNewLiveText, 
  data, 
  handleDeleteColumn, 
  handleHideColumn,
  handleRenameColumn, 
  handleSetActive, 
  setColumnTitle, 
  setPostTitle, 
}) {


  return (

    <>
      <div className='manageColumns-container'>
        <DisplayManageColumnsPanel 
          data={data} 
          activeLiveTextState={activeLiveTextState} 
          allowColumnTitle={allowColumnTitle}
          setColumnTitle={setColumnTitle}
          
          handleSetActive={handleSetActive} 
          handleDeleteColumn={handleDeleteColumn}
          handleRenameColumn={handleRenameColumn}
          handleHideColumn={handleHideColumn}
        />
      </div>

      <div className='manageColumns-createNewLiveColumn'>
        <h3>Create New Column</h3>
        <div>
            <Title needButton allowPost={allowPost} field={""} passNewFieldValue={setPostTitle} handleClick={createNewLiveText}/>
        </div>
      </div>
    </>
    )
}
