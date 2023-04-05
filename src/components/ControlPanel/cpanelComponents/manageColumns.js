import React from 'react'
import Title from '../../InputForm/Title'

import DisplayManageColumnsPanel from './displayManageColumnsPanel'
import { FaPlus } from 'react-icons/fa'
import AddNewButton from '../../Utility/Buttons/addNewButton'
export default function ManageColumns({data, handleSetActive, activeLiveTextState, handleDeleteColumn, setPostTitle, createNewLiveText}) {
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
            <Title passNewFieldValue={setPostTitle}/>
            <AddNewButton handleClick={createNewLiveText} title="Create New Column"/>
        </div>
      </div>

    </div>
    )
}
