import React from 'react'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'

import Title from '../../InputForm/Title'

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

                
                <div dangerouslySetInnerHTML={createMarkup(columnContent.headline)}></div> 


                <button onClick={()=>handleSetActive(columnId, columnContent)}>View</button>

                {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null : 
                  <>  
                    <button onClick={()=>goToNewPostInput(columnContent, columnId)}>Add Post</button> 
                  </>        
                }

                <button onClick={()=>handleDeleteColumn(columnId)}>Delete Column Please :)</button>

              </div>
            )
          })
          )
        })}
      
      <div className='manageColumns-createNewLiveColumn'>
        <h3>Enter Title</h3>
        <div>
            <Title passNewFieldValue={setPostTitle}/>
            <button onClick={createNewLiveText}>Create New Live Text</button>
        </div>
      </div>
    </div>
    )
}
