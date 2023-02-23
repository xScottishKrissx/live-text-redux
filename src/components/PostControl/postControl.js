import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import './postControl.css'

import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash} from 'react-icons/fa'

export default function PostControl({id, handleEdit, body, subtitle, title, editMode, hide}) {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    const getOtherPosts = liveText.filter(x => x.id !== id)

    const handleDelete = () =>{
        console.log("Delete: " + id)
        updateWebsite()
    }

    const handleHide = (setHide) =>{
        const setHidden = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, hidden:setHide}
        })       
        updateWebsite(setHidden)
        console.log("Hide")
    }

    const saveEdit = () =>{
        const editCurrentPost = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, body, title, subtitle}
        })
        updateWebsite(editCurrentPost)          
    }

    const updateWebsite = (changedPost) =>{

        if(changedPost){
            const mergeObjects = [...getOtherPosts, ...changedPost]
            dispatch(updateArray(mergeObjects))
            localStorage.setItem("live-text", JSON.stringify(mergeObjects))   
        }
        else{
            dispatch(updateArray(getOtherPosts))
            localStorage.setItem("live-text", JSON.stringify(getOtherPosts))   
        }
        handleEdit(false)

    }

  return (
    <div className='post-control-bar'>
        {editMode ? 
            <button onClick={saveEdit}><FaSave /> Save </button>
                :
            <button onClick={()=>handleEdit(true)}><FaEdit /> Edit Post</button>
        }
        
        <button onClick={handleDelete}><FaTrash/> Delete</button>
        
        {hide ?
            <button className='post-control-bar-isHidden' onClick={()=>handleHide(false)}><FaEyeSlash/>Hidden</button>
            :
            <button onClick={()=>handleHide(true)}><FaEye /> Visible</button>
        }
    </div>
  )
}
