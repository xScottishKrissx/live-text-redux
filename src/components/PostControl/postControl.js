import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

export default function PostControl({id, handleEdit, body, subtitle, title, editMode, hide}) {
    
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)

    const handleDelete = () =>{
        console.log("Delete: " + id)
        const filterCurrentPosts = liveText.filter(x => x.id !== id)
        updateWebsite(filterCurrentPosts)
    }

    const updateWebsite = (newArray) =>{
        dispatch(updateArray(newArray))
        localStorage.setItem("live-text", JSON.stringify(newArray))   
        handleEdit(false)
    }

    const handleHide = (setHide) =>{
        const postToHide = liveText.filter(x => x.id === id)
        const setHidden = postToHide.map(item =>{
            if(item.id === id) return {...item, hidden:setHide}
        })
        
        const currentPosts = liveText.filter(x => x.id !== id)        
        
        const mergeObjects = [...currentPosts, ...setHidden]
        // Update website
        updateWebsite(mergeObjects)
        
    }

    const saveEdit = () =>{
        const getCurrentPost = liveText.filter(x => x.id === id)
        const updateCurrentPost = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, body, title, subtitle}
        })
        const remainingPosts = liveText.filter(x => x.id !== id) 
        const mergeObjects = [...remainingPosts, ...updateCurrentPost]
        updateWebsite(mergeObjects)          
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
