import React from 'react'
import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash, FaCheck, FaTimes, FaStepForward} from 'react-icons/fa'
import DeleteButton from '../Utility/Buttons/deleteButton'

export default function PostControlView({title, body, hidden, editMode, handleSaveEdit, createNewPost, handleHide, handleDelete}) {
    
    let minChars = 10
    const titleOk = title.length > minChars
    const bodyOk = body.length > minChars
    const allowPost = titleOk && bodyOk

    return (
<div className='post-control-bar'>
            <div className='post-control-bar-main-control'>
                {titleOk ? 
                    <button className='defaultBtnStyle atMinCharLim'>Title <FaCheck /></button> :  
                    <button className='defaultBtnStyle belowMinCharLim'>Title <FaTimes /></button>
                }
                {bodyOk ? 
                    <button className='defaultBtnStyle atMinCharLim'>Body <FaCheck /></button> :  
                    <button className='defaultBtnStyle belowMinCharLim'>Body <FaTimes /></button>
                }
            

            
            {editMode ? 
                    // Edit an Existing Post
                    allowPost ?
                        <button className='defaultBtnStyle  postCanSubmit' onClick={handleSaveEdit}><FaSave /> Save </button>
                        :
                        // <button className='defaultBtnStyle' ><FaSave/>Save: Title, Body Required </button>
                        <button className='defaultBtnStyle' ><FaSave/>
                            {bodyOk && !titleOk ? "Save: Title Required" : null }
                            {!bodyOk && titleOk ? "Save: Body Required" : null } 
                        </button>
                    :
                    // Creating a New Post
                    allowPost ? 
                        <button className='defaultBtnStyle postCanSubmit' onClick={ ()=>{ createNewPost() }}> Post Now <FaStepForward /></button>
                        : 
                        <button className='defaultBtnStyle postCantSubmit'> Req. Fields Empty </button>
                }
            </div>

            <div className='post-control-bar-edit-options'>
                {editMode ? 
                    <DeleteButton showText handleClick={handleDelete} title="Delete Post" />
                : null }
                
                {editMode ? 
                    hidden ?
                    <button className='post-control-bar-isHidden defaultBtnStyle' onClick={()=>handleHide(false)}><FaEyeSlash/>Hidden</button>
                    :
                    <button className='defaultBtnStyle' onClick={()=>handleHide(true)}><FaEye /> Visible</button>
                    : null
                }
            </div>
        </div>
    )
}
