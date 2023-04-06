import React from 'react'
import Title from '../../InputForm/Title'


import DisplayManageColumnsPanel from './displayManageColumnsPanel'
import AddNewButton from '../../Utility/Buttons/addNewButton'
export default function ManageColumns({data, handleSetActive, activeLiveTextState, handleDeleteColumn, setPostTitle, createNewLiveText, allowPost}) {
  return (
    <div className='manageColumns-container'>

      <DisplayManageColumnsPanel 
        data={data} 
        activeLiveTextState={activeLiveTextState} 
        handleSetActive={handleSetActive} 
        handleDeleteColumn={handleDeleteColumn}
      />
      <h1>or create a new column...</h1>
      <div className='manageColumns-createNewLiveColumn'>
        <div>
            <Title needButton allowPost={allowPost} field={""} passNewFieldValue={setPostTitle} handleClick={createNewLiveText}/>
            {/* <AddNewButton handleClick={createNewLiveText} title="Create New Column"/> */}
        </div>
      </div>

    </div>
    )
}
