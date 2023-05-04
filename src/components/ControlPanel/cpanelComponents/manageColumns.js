import React,{useState} from 'react'
import Title from '../../InputForm/Title'


import DisplayManageColumnsPanel from './DisplayManageColumnsPanel/displayManageColumnsPanel'
// import AddNewButton from '../../Utility/Buttons/addNewButton'
export default function ManageColumns({data, handleSetActive, activeLiveTextState, handleDeleteColumn, setPostTitle, createNewLiveText, allowPost, handleRenameColumn, setColumnTitle, allowColumnTitle, handleHideColumn}) {


  return (

    <>
    
    <div className='manageColumns-container'>
      
      <h3>Manage Columns</h3>
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
