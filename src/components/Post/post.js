import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './post.css'

import { setEdit } from '../../features/editState';
import PostTimestamp from './View/PostTimestamp';
import PostContent from './View/PostContent';
import PostTwitter from './View/PostTwitter';
import PostYoutube from './View/PostYoutube';
import { setCPanelVis } from '../../features/cpanelVis';
import EditButton from './editButton';

import PostShareBar from './View/PostShareBar';

export default function Post({title, subtitle, body, id, timestamp, loggedIn, image, tweet, youtube, hidden, hideEditBtn}) {
    const dispatch = useDispatch()
    // localStorage.clear()
    const liveText = useSelector((state) => state.livetext.value)
    const cPanelVis = useSelector((state) => state.cPanelVis.value)
    const editModeState = useSelector((state) => state.edit.value)
    const {editing} = editModeState
    
    if(!liveText) return
    
    const handleEdit = (editing, editId,) =>  {
        dispatch( setEdit({ editing, editId}) )
        dispatch( setCPanelVis(!cPanelVis))
    } 

    return (
    
        <div key={id} className="post-item-container" >
            
            <div className='post-item-container-top-bar'>
                <PostTimestamp timestamp={timestamp} />
                {hideEditBtn ? null : <EditButton loggedIn id={id} handleEdit={handleEdit} />}
            </div>

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
            <PostShareBar />

    </div>
    )
}
