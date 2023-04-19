import React,{useState} from 'react'
import Title from '../../InputForm/Title'


import DisplayManageColumnsPanel from './DisplayManageColumnsPanel/displayManageColumnsPanel'
// import AddNewButton from '../../Utility/Buttons/addNewButton'
export default function ManageColumns({data, handleSetActive, activeLiveTextState, handleDeleteColumn, setPostTitle, createNewLiveText, allowPost, handleRenameColumn, setColumnTitle, allowColumnTitle}) {



  return (
    <div className='manageColumns-container'>

      <DisplayManageColumnsPanel 
        data={data} 
        activeLiveTextState={activeLiveTextState} 
        allowColumnTitle={allowColumnTitle}
        setColumnTitle={setColumnTitle}
        
        handleSetActive={handleSetActive} 
        handleDeleteColumn={handleDeleteColumn}
        handleRenameColumn={handleRenameColumn}
      />
 
      <span>or create a new column...</span>
      <div className='manageColumns-createNewLiveColumn'>
        <div>
            <Title needButton allowPost={allowPost} field={""} passNewFieldValue={setPostTitle} handleClick={createNewLiveText}/>
        </div>
      </div>

    </div>
    )
}
