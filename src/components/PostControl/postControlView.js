import React from 'react'
import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash, FaCheck, FaTimes} from 'react-icons/fa'

export default function PostControlView({title, body, hidden, editMode, handleSaveEdit, createNewPost, handleHide, handleDelete}) {
    
    let minChars = 10
    const allowPost = title.length > minChars && body.length > minChars
    const titleOk = title.length > minChars
    const bodyOk = body.length > minChars

    return (
        <div className='post-control-bar'>
            {editMode ? 
                    // Edit an Existing Post
                    allowPost ?
                        <button className='defaultBtnStyle' onClick={handleSaveEdit}><FaSave /> Save </button>
                        :
                        <button className='defaultBtnStyle' ><FaSave />Save: Title and Body Required </button>

                    :
                    // Creating a New Post
                    allowPost ? 
                        <button className='defaultBtnStyle postIsCanSubmit' onClick={ ()=>{ createNewPost() }}> <FaEdit /> Ready To Submit</button>
                        : 
                        // <button className='defaultBtnStyle'><FaEdit />Create New Post: Title and Body Required</button>
                        <>
                            {titleOk ? 
                                <button className='defaultBtnStyle atMinCharLim'>Title <FaCheck /></button> :  
                                <button className='defaultBtnStyle belowMinCharLim'>Title <FaTimes /></button>
                            }
                            {bodyOk ? 
                                <button className='defaultBtnStyle atMinCharLim'>Body <FaCheck /></button> :  
                                <button className='defaultBtnStyle belowMinCharLim'>Body <FaTimes /></button>
                            }
                        </>
            }

            {editMode ? <button onClick={handleDelete}><FaTrash/> Delete</button> : null }
            
            {editMode ? 
                hidden ?
                    <button className='post-control-bar-isHidden' onClick={()=>handleHide(false)}><FaEyeSlash/>Hidden</button>
                    :
                    <button onClick={()=>handleHide(true)}><FaEye /> Visible</button>
                : null
            }
        </div>
    )
}
