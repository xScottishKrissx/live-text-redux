import React,{useState, useEffect} from 'react'
import dayjs from 'dayjs';

export default function PostTimestamp({ timestamp }) {

    const checkTimeSincePost = (Date.now() - timestamp) / 1000
    const [checkNewPost, setNewPost] = useState(false) 
    const formatTimestamp = dayjs(timestamp).format('HH:mm - dddd, MMM YYYY')

    useEffect(() =>{
        if(checkTimeSincePost < 60){
            setNewPost(true)
        }else{
            setNewPost(false)
            return
        }
        setTimeout(() =>{ setNewPost(false) },60000)
    },[])

    return (
        <div className='post-item-time-stamp'> 
            <div className='post-item-time-stamp-item'> {formatTimestamp}  </div>
            {checkNewPost ? <div className='post-item-new-post-indicator'>New</div> : null }
        </div>
    )
}
