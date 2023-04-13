import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'
import ControlPanel from './ControlPanel/controlPanel'
import { setCPanelVis } from '../features/cpanelVis'
import ToggleCPanelButton from './Utility/Buttons/toggleCPanelButton'
import InputStyleButton from './Utility/Buttons/inputStyleButton'


export default function AuthorInput() {
  const dispatch = useDispatch()
  /////// Handle Edit
  const editModeState = useSelector((state) => state.edit.value)
  const cPanelVisState = useSelector((state) => state.cPanelVis.value)

  const [showControlPanel, setControlPanelVis] = useState(true)

  const handleEdit = (x) => {
    dispatch(setEdit({editing:x, editId: null}))
  }

  const toggleCPanel = (x) =>{ dispatch(setCPanelVis(!cPanelVisState)) }

  const returnToCPanel = () =>{
    handleEdit(false)
    toggleCPanel()
  }
 
  return (
    <>

      <div className='author-input-wrapper 1st'>
        
        <div className='author-input-wrapper-top-bar'>
          {!editModeState.editing ? 
          // <ToggleCPanelButton toggleCPanel={toggleCPanel} /> 
          // <button className='defaultBtnStyle' onClick={returnToCPanel}>Return</button>
          // null
          null
          : 
          // <button className='defaultBtnStyle' onClick={returnToCPanel}>Return</button>
          null
         }
          {/* <ToggleCPanelButton toggleCPanel={toggleCPanel} /> */}
          {!cPanelVisState ? 
          <>
            <button className='defaultBtnStyle' onClick={returnToCPanel}> ...Return</button>
            <InputStyleButton /> 
          </>
            :  null     }
        </div>

       
        {cPanelVisState === true ? 
            <ControlPanel setControlPanelVis={setControlPanelVis} />
          :
            <>
              {editModeState.editing ? 
                <EditTiptap id={editModeState.editId} handleEdit={handleEdit} />
                :
                <NewPost handleEdit={handleEdit} />
              }
            </>
        }
      </div>
    </>
  )
}
