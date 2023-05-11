import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { setEdit } from '../../../features/editState'
import { setCPanelVis } from '../../../features/cpanelVis'

// Icons
import { FaStepBackward } from 'react-icons/fa'
import InputStyleButton from '../../Utility/Buttons/inputStyleButton'
import CPanelViewStyleButton from '../../Utility/Buttons/cPanelViewStyleButton'

export default function PostControlBar() {
    
    const cPanelVisState = useSelector((state) => state.cPanelVis.value)
    
    const dispatch = useDispatch()

    const returnToCPanel = () =>{
        dispatch(setCPanelVis(!cPanelVisState)) 
        dispatch(setEdit({editing:false, editId: null}))
      }
 
      
  return (
        !cPanelVisState ? 
          <div className='author-input-wrapper-top-bar '>
            <>
              <button className='defaultBtnStyle' onClick={returnToCPanel}> <FaStepBackward /> Back </button>
              {/* <InputStyleButton />  */}
              <CPanelViewStyleButton />
            </>
          </div>
        :  null
  )
}
