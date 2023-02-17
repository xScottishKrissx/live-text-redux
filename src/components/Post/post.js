import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
import dayjs, { Dayjs } from 'dayjs';

import './post.css'
import EditTiptap from '../EditPost/editView'
import PostControl from '../PostControl/postControl'


import glasgow from '../../Assets/glasgow.png'

export default function Post({title, subtitle, body, type, id, timestamp, hidden, loggedIn, image}) {

    // localStorage.clear()

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
    const readysubtitle = subtitle.replace('@', '')
    const readyBody = body.replace('@', '')
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
        
        {editMode ? 
            
            <EditTiptap 
                id={id} 
                readyPostTitle={readyPostTitle} 
                subtitle={readysubtitle} 
                body={readyBody} 
                handleEdit={handleEdit}
            />
            
            :

            <div className='post-item-body'>
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
                        <div className='post-item-subtitle' dangerouslySetInnerHTML={createMarkup(readysubtitle)}></div>
                    </div>
                </div>
                {image ? <img src={require("../../Assets/" + image)} /> : null}
                <div dangerouslySetInnerHTML={createMarkup(readyBody)}></div>
            </div>
        }
        
        {/* <img src={glasgow} /> */}
        
        <div>Social Media</div>
        {checkNewPost ? <div className='post-item-new-post-indicator'>New</div> : null }
        </div>
    )
}
