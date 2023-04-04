import React from 'react'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'

import Title from '../../InputForm/Title'

import { FaCheck, FaRegCircle, FaPlus, FaTrash } from 'react-icons/fa'

export default function ManageColumns({data, handleSetActive, activeLiveTextState, setControlPanelVis, handleDeleteColumn, setPostTitle, createNewLiveText}) {
  const dispatch = useDispatch()
  const cPanelVis = useSelector((state) => state.cPanelVis.value)
  const goToNewPostInput = (content, id) =>{
    // setControlPanelVis(false)
    dispatch(setCPanelVis(!cPanelVis))
    handleSetActive(id, content)
  }
  const createMarkup = (html) =>{ return{ __html:DOMPurify.sanitize(html) } }
  

  return (
    <div className='manageColumns-container'>
    {Object.keys(data).map((i) =>{
      return(
          Object.entries(data[i]).map(([columnId, columnContent]) =>{
            
            return(
              <div className='manageColumns-column' key={columnId}>

                <div className='manageColumns-activeCheck'>{activeLiveTextState === columnId ? 
                  <span title="Column is active" id="colIsActive"><FaCheck /></span> 
                    : 
                  <span title="Set Column Active" onClick={()=>handleSetActive(columnId, columnContent)}><FaRegCircle /></span>
                  }
                </div>

                <div dangerouslySetInnerHTML={createMarkup(columnContent.headline)}></div> 


                <div className='manageColumns-column-buttons'>

                {/* <button onClick={()=>handleSetActive(columnId, columnContent)}>View</button> */}

                {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null : 
                  <>  
                    <button title="Add New Post"  onClick={()=>goToNewPostInput(columnContent, columnId)}><FaPlus /></button> 
                  </>        
                }

                <button title="Delete Column" onClick={()=>handleDeleteColumn(columnId)}><FaTrash /></button>
                </div>

              </div>
            )
          })
          )
        })}
      
      <div className='manageColumns-createNewLiveColumn'>
        <div>
            <Title passNewFieldValue={setPostTitle}/>
            <button onClick={createNewLiveText}>Create New Live Text</button>
        </div>
      </div>
    </div>
    )
}
