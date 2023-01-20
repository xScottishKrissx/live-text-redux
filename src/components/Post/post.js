import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DOMPurify from 'dompurify'
import { updateArray } from '../../features/live-text'

import './post.css'
export default function Post({title, subtitle, body, type, id, timestamp, hidden}) {
    const dispatch = useDispatch()
    // localStorage.clear()
    const [editMode, setEditMode] = useState(false)
    const liveText = useSelector((state) => state.livetext.value)
    // console.log(liveText)
    if(!liveText) return
    // console.log(liveText)

    if(!title || !body ) return

    const readyPostTitle = title.replace('@', '')
    const readyPostType = type.length ? type + " - " : ""
    const headlineIcon = false

    const createMarkup = (html) =>{
        return{
            __html:DOMPurify.sanitize(html)
        }
    }

    const handleEdit = () =>{
        console.log("Edit: " + id)
        setEditMode(true)
    }

    const handleDelete = () =>{
        console.log("Delete: " + id)
        const filterCurrentPosts = liveText.filter(x => x.id !== id)
        dispatch(updateArray(filterCurrentPosts))
        localStorage.setItem("live-text", JSON.stringify(filterCurrentPosts))
    }

    const handleHide = (setHide) =>{
        const postToHide = liveText.filter(x => x.id === id)
        const setHidden = postToHide.map(item =>{
            if(item.id === id) return {...item, hidden:setHide}
        })
        
        const currentPosts = liveText.filter(x => x.id !== id)        
        
        const mergeObjects = [...currentPosts, ...setHidden]
        // Update website
        dispatch(updateArray(mergeObjects))
        localStorage.setItem("live-text", JSON.stringify(mergeObjects))        
    }

    console.log(liveText)

    


    return (
    
        <div className='post-item-container' >
        {editMode ? "Edit Mode" :
            <>

            <div className='post-item-time-stamp'>{timestamp}</div>

            {/* <button onClick={handleEdit}>Edit Me</button> */}
            <button onClick={handleDelete}>Delete Me</button>
            <button onClick={()=>handleHide(true)}>Hide Me</button>
            <button onClick={()=>handleHide(false)}>Show Me</button>

            <div className='post-item-headline-wrapper'>

                { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""} 
                
                <div className='post-item-headline-content '>
                    <div className='post-item-title'>
                        {hidden ? <div> ** Hidden ** </div>  : <div> // Live \\ </div> }
                        <div dangerouslySetInnerHTML={createMarkup(readyPostTitle)}></div>
                    </div>
                    <div 
                        className='post-item-subtitle' 
                        dangerouslySetInnerHTML={createMarkup(subtitle)}
                        ></div>
                </div>
            </div>
            
            
            <div dangerouslySetInnerHTML={createMarkup(body)}></div>
            <div>Social Media</div>
                        </>
        }
        </div>
    )
}
