import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'

export default function ManageColumns({data, handleSetActive, activeLiveTextState, setControlPanelVis}) {
  const dispatch = useDispatch()
  const cPanelVis = useSelector((state) => state.cPanelVis.value)
  const goToNewPostInput = (content, id) =>{
    // setControlPanelVis(false)
    dispatch(setCPanelVis(!cPanelVis))
    handleSetActive(id, content)
  }
  return (
    Object.keys(data).map((i) =>{
        return(
          Object.entries(data[i]).map(([columnId, columnContent]) =>{
            return(
              <div key={columnId}>

                {columnContent.type}-{columnId}
                
                <button onClick={()=>handleSetActive(columnId, columnContent)}>View</button>

                {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null : 
                  <>  
                    <button onClick={()=>goToNewPostInput(columnContent, columnId)}>Add Post</button> 
                  </>        
                }

              </div>
            )
          })
        )
      })
  )
}
