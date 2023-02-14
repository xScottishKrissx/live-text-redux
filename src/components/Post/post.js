import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
import dayjs, { Dayjs } from 'dayjs';

import './post.css'
import EditTiptap from '../EditPost/editView'
import PostControl from '../PostControl/postControl'

export default function Post({title, subtitle, body, type, id, timestamp, hidden, loggedIn}) {


    const [editMode, setEditMode] = useState(false)
    const liveText = useSelector((state) => state.livetext.value)

    // Indicate if post is new
    const [checkNewPost, setNewPost] = useState(false)  
    // Measuring time since post in seconds
    const checkTimeSincePost = (Date.now() - timestamp) / 1000
    
    useEffect(() =>{
        if(checkTimeSincePost < 60){
            setNewPost(true)
        }else{
            setNewPost(false)
            return
        }
        setTimeout(() =>{ setNewPost(false) },60000)
    },[])

    if(!liveText) return
    if(!title || !body ) return

    const readyPostTitle = title.replace('@', '')
    const headlineIcon = false

    const createMarkup = (html) =>{
        return{
            __html:DOMPurify.sanitize(html)
        }
    }

    const handleEdit = (x) => setEditMode(x) 
    const formatTimestamp = dayjs(timestamp).format('HH:mm - dddd, MMM YYYY')

    return (
    
        <div key={id} className={ `${editMode ? "post-item-container-editMode" : "post-item-container" }` } >
        <div className='post-item-time-stamp'> {formatTimestamp} </div>
        {checkNewPost ? <p>New Post</p> : <p>Not New Post</p>}
        {editMode ? 
            
            <EditTiptap 
                id={id} 
                readyPostTitle={readyPostTitle} 
                subtitle={subtitle} 
                body={body} 
                handleEdit={handleEdit}
            />
            
            :

            <>
                {loggedIn ? 
                    <PostControl 
                        handleEdit={handleEdit} 
                        id={id} 
                        hide={hidden}
                    />
                :
                    null
                }

                <div className='post-item-headline-wrapper'>

                    { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""} 
                    
                    <div className='post-item-headline-content '>
                        <div className='post-item-title'>
                            <div dangerouslySetInnerHTML={createMarkup(readyPostTitle)}></div>
                        </div>
                        <div className='post-item-subtitle' dangerouslySetInnerHTML={createMarkup(subtitle)}></div>
                    </div>
                </div>
                
                <div dangerouslySetInnerHTML={createMarkup(body)}></div>
            </>
        }
        <div>Social Media</div>
        </div>
    )
}
