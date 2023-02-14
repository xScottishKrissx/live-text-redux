import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../features/item'
import { updateArray } from '../features/live-text'
import './author-input.css'
import Tiptap from './Tiptap/Tiptap'

import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs';
import {relativeTime} from 'dayjs/plugin/relativeTime'


const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
export default function AuthorInput() {
  const dispatch = useDispatch()
  const liveText = useSelector((state) => state.livetext.value)

  const [postTitle, setPostTitle] = useState("")
  const [postSubTitle, setPostSubTitle] = useState("")
  const [postType, setPostType] = useState("")
  const [postBody, setPostBody] = useState("")
  const [clearContent, setClearContent] = useState(false)

  const [tag, setTag] = useState("true")

  useEffect(() => {
    dispatch(addItem({postTitle,postSubTitle, postType, postBody}))
  },[postTitle,postSubTitle, postBody, postType])


  // console.log(Date.now())


  const pushLive = () =>{
    const newPost = [{
      id: uuidv4(), 
      body: postBody, 
      title: postTitle, 
      subtitle: postSubTitle, 
      type: postType,
      // timestamp: dayjs().format('HH:mm - dddd, MMM YYYY'),
      timestamp:Date.now(),
      hidden:false
    }]

    const updateLiveTextArray = [newPost[0]].concat(liveText)
    dispatch(updateArray(updateLiveTextArray))
    localStorage.setItem("live-text", JSON.stringify(updateLiveTextArray))
    console.log("Clear Form")
    setClearContent(true)
  }

  const cancelUpdate = () =>{
    setClearContent(true)
  }


  return (
    <div className='author-input-wrapper'>
      <div className='author-input-form'>
 
        <div className='author-input-form-title'>
          <Tiptap 
            location={"title-enter"} 
            setPostBody={setPostTitle}  
            clearContent={clearContent} 
            setClearContent={setClearContent}
          />
        </div>

        <div className='author-input-form-subtitle'>
          <Tiptap 
            location={"subtitle-enter"} 
            setPostBody={setPostSubTitle} 
            clearContent={clearContent}
            setClearContent={setClearContent}
          />
        </div>
 
      <div className="author-input-form-type-select">
        <div className='author-input-form-type-select-items'>
          {typeRange.map((item, index) => {
            const removeSpacesFromName = item.replace(/\s+/g, '')
            return(
              <div key={index} onClick={()=>setPostType(removeSpacesFromName)} id={removeSpacesFromName}>{item}</div>
            )
          })}
        </div>
      </div>

        {/* Write the main body of the card */}
        <div className="author-input-form-text-area">
          <Tiptap 
            location={"text-area"} 
            setPostBody={setPostBody} 
            clearContent={clearContent}
            setClearContent={setClearContent}
          />
        </div>      

        {/* Pass the card for review to the review area */}
        {/* <button onClick={()=>{dispatch(addItem({postTitle, postType, postBody}))}}>Submit for Review</button> */}
        {postTitle.length > 10 && postBody.length > 10 ? 
          <div className='item-review-confirm-button'>
            <button onClick={pushLive}>Confirm</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </div>
        : null }
      </div>
    </div>
  )
}
