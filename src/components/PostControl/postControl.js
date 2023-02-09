import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

export default function PostControl({id, handleEdit, body, subtitle, title, editMode, hide}) {
    
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    const getOtherPosts = liveText.filter(x => x.id !== id)

    const handleDelete = () =>{
        console.log("Delete: " + id)
        updateWebsite(getOtherPosts)
    }

    const handleHide = (setHide) =>{
        const setHidden = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, hidden:setHide}
        })       
        updateWebsite(setHidden)
    }

    const saveEdit = () =>{
        const editCurrentPost = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, body, title, subtitle}
        })
        updateWebsite(editCurrentPost)          
    }

    const updateWebsite = (changedPost) =>{
        const mergeObjects = [...getOtherPosts, ...changedPost]
        dispatch(updateArray(mergeObjects))
        localStorage.setItem("live-text", JSON.stringify(mergeObjects))   
        handleEdit(false)
    }

  return (
    <>
        {editMode ? 
            <button onClick={saveEdit}>Save</button>
                :
            <button onClick={()=>handleEdit(true)}>Edit Me</button>
        }
        ---
        <button onClick={handleDelete}>Delete Me</button>
        ---
        {!hide ?
            <button onClick={()=>handleHide(true)}>Hide Me</button>
            :
            <button onClick={()=>handleHide(false)}>Show Me</button>
        }
    </>
  )
}
