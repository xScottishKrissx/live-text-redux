import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'
import ControlPanel from './ControlPanel/controlPanel'
import { setCPanelVis } from '../features/cpanelVis'
// import ToggleCPanelButton from './Utility/Buttons/toggleCPanelButton'
import InputStyleButton from './Utility/Buttons/inputStyleButton'

import { FaStepBackward } from 'react-icons/fa'
import User from './User/User'
import loggedIn from '../features/loggedIn'
export default function AuthorInput({test}) {
  const dispatch = useDispatch()
  /////// Handle Edit
  const editModeState = useSelector((state) => state.edit.value)
  const cPanelVisState = useSelector((state) => state.cPanelVis.value)
  const loggedInState = useSelector((state) => state.loggedIn.value)
  const [showControlPanel, setControlPanelVis] = useState(true)

  const handleEdit = (x) => {
    dispatch(setEdit({editing:x, editId: null}))
  }

  const returnToCPanel = () =>{
    handleEdit(false)
    dispatch(setCPanelVis(!cPanelVisState)) 
  }
 
  return (
    <>

      <div className='author-input-wrapper 1st'>
        <User test={test} />
        
          <>
          
          <div className='author-input-wrapper-top-bar'>

            {!cPanelVisState ? 
            <>
              <button className='defaultBtnStyle' onClick={returnToCPanel}> <FaStepBackward /> Back </button>
              <InputStyleButton /> 
            </>
              :  null}
          </div>

        
          {cPanelVisState === true ? 
            <ControlPanel setControlPanelVis={setControlPanelVis} test={test}/>
            :
            <>
            {editModeState.editing ? 
              <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
              :
              <NewPost handleEdit={handleEdit} />
            }
              </>
          }


          </>
        
      </div>
    </>
  )
}
