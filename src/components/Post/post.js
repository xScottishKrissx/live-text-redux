import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './post.css'

import { setEdit } from '../../features/editState';
import PostTimestamp from './View/PostTimestamp';
import PostContent from './View/PostContent';
import PostTwitter from './View/PostTwitter';
import PostYoutube from './View/PostYoutube';
import { setCPanelVis } from '../../features/cpanelVis';

export default function Post({title, subtitle, body, id, timestamp, loggedIn, image, tweet, youtube, hidden}) {
    const dispatch = useDispatch()
    // localStorage.clear()

    const liveText = useSelector((state) => state.livetext.value)
    const cPanelVis = useSelector((state) => state.cPanelVis.value)
    const editModeState = useSelector((state) => state.edit.value)
    const {editing, editId} = editModeState
    // const [editMode, setEditMode] = useState(editModeState.editing)

    if(!liveText) return
    

    const handleEdit = (editing, editId,) =>  {
        dispatch( setEdit({ editing, editId}) )
        dispatch( setCPanelVis(!cPanelVis))
    } 
    const editingIsActiveOnThisPost = editing && editId === id

    return (
    
        <div key={id}  className={ `${editingIsActiveOnThisPost ? "post-item-container-editMode" : "post-item-container" }` } >
            
            <PostTimestamp timestamp={timestamp} />
            <PostContent
                editMode={editing}
                editModeState={editModeState}

                handleEdit={handleEdit}
                id={id}
                loggedIn={loggedIn} 
                title={title}
                subtitle={subtitle}
                body={body}
                image={image}
                hidden={hidden}

            />
            <PostTwitter tweet={tweet}/>
            <PostYoutube youtube={youtube} />        
    </div>
    )
}
