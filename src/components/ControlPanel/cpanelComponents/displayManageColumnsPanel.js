import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCPanelVis } from '../../../features/cpanelVis'
import { removeTag } from '../../Utility/removeTag'
import AddNewButton from '../../Utility/Buttons/addNewButton'
import { FaCheck, FaRegCircle } from 'react-icons/fa'
import DeleteButton from '../../Utility/Buttons/deleteButton'

export default function DisplayManageColumnsPanel({data, activeLiveTextState, handleSetActive, handleDeleteColumn}) {

    const dispatch = useDispatch()
    const cPanelVis = useSelector((state) => state.cPanelVis.value)

    const goToNewPostInput = (content, id) =>{
        dispatch(setCPanelVis(!cPanelVis))
        handleSetActive(id, content)
    }

    const displayManageColumnsPanel = Object.keys(data).map((i) =>{
        return(
            Object.entries(data[i]).map(([columnId, columnContent]) =>{
                return(
                    <div className='manageColumns-column' key={columnId}>
        
                        <div className='manageColumns-activeCheck'>{activeLiveTextState === columnId ? 
                            <span className='checkActiveButton' title="Column is active" id="colIsActive"><FaCheck /></span> 
                            : 
                            <span className='checkActiveButton' title="Set Column Active" onClick={()=>handleSetActive(columnId, columnContent)}><FaRegCircle /></span>
                            }
                        </div>
            
                        <div 
                            onClick={()=>handleSetActive(columnId, columnContent)} 
                            className='manageColumns-headline'
                        >
                                {removeTag(columnContent.headline)}
                        </div>
            
                        <div className='manageColumns-column-buttons'>
                            {activeLiveTextState.length === 0 && activeLiveTextState !== columnId ? null :   
                                <AddNewButton title="Add New Post" handleClick={()=>goToNewPostInput(columnContent,columnId)} />
                            }
                            <DeleteButton title="Delete Column" handleClick={()=>handleDeleteColumn(columnId)} />
                        </div>
        
                    </div>
                )
            })  
        )
    })
  
          
  return displayManageColumnsPanel
}
