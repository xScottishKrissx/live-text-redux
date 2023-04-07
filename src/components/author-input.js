import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit } from '../features/editState'

import EditTiptap from './EditPost/editView'
import NewPost from './NewPost/NewPost'

import './author-input.css'
import ControlPanel from './ControlPanel/controlPanel'
import { setCPanelVis } from '../features/cpanelVis'
import ToggleCPanelButton from './Utility/Buttons/toggleCPanelButton'


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

 
  return (
    <>

      <div className='author-input-wrapper'>
        {!editModeState.editing ? <ToggleCPanelButton toggleCPanel={toggleCPanel} /> : null }
       
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
