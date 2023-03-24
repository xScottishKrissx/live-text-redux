import React from 'react'
import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash} from 'react-icons/fa'
import { useDispatch } from 'react-redux'


import { setForm } from '../../features/resetForm'

export default function PostControlView({title, body, hidden, editMode, handleSaveEdit, createNewPost, handleHide, handleDelete}) {
    
    const dispatch = useDispatch()
    
    let minChars = 10
    const allowPost = title.length > minChars && body.length > minChars

    return (
        <div className='post-control-bar'>
            {editMode ? 
                    // Edit an Existing Post
                    allowPost ?
                        <button onClick={handleSaveEdit}><FaSave /> Save </button>
                        :
                        <button ><FaSave />Save: Title and Body Required </button>

                    :
                    // Creating a New Post
                    allowPost ? 
                    <button onClick={ ()=>{ 
                        createNewPost() 
                        dispatch(setForm(true))}}>
                        <FaEdit /> Create New Post</button>
                    : 
                    <button><FaEdit />Create New Post: Title and Body Required</button>
            }
            {editMode ? <button onClick={handleDelete}><FaTrash/> Delete</button> : null }
            
            {hidden ?
                <button className='post-control-bar-isHidden' onClick={()=>handleHide(false)}><FaEyeSlash/>Hidden</button>
                :
                <button onClick={()=>handleHide(true)}><FaEye /> Visible</button>
            }
        </div>
    )
}
