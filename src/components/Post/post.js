import React, {useState} from 'react'
import DOMPurify from 'dompurify'

import './post.css'
export default function Post({title, subtitle, body, type, id, timestamp}) {
    const [editMode, setEditMode] = useState(false)
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

    


    return (
    
        <div className='post-item-container' >
        {editMode ? "Edit Mode" :
            <>

            <div className='post-item-time-stamp'>{timestamp}</div>

            {/* <button onClick={handleEdit}>Edit Me</button> */}

            <div className='post-item-headline-wrapper'>

                { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""} 
                
                <div className='post-item-headline-content '>
                    <div className='post-item-title'>
                        {readyPostType ? <div>{readyPostType} </div>  : null }
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
