import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/item'
import './author-input.css'
import MentionEditor from './Mention/mentionEditor'
import TextArea from './text-area'
import Tiptap from './Tiptap/Tiptap'

const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
export default function AuthorInput() {
  const dispatch = useDispatch()

  const [postTitle, setPostTitle] = useState("")
  const [postType, setPostType] = useState("")
  const [postBody, setPostBody] = useState("")
  const [postForReview, setPostForReview] = useState({postTitle:"", postType:"", postBody:""})
  const [tag, setTag] = useState("true")

  useEffect(() => {
    dispatch(addItem({postTitle, postType, postBody}))
  },[postTitle, postBody, postType])



  return (
    <div className='author-input-wrapper'>
      <div className='author-input-form'>
 
        <div className='author-input-form-title'>
          <input type="text" placeholder='Enter Title..' name='title' onChange={(e)=>setPostTitle(e.target.value)}/>
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
          {/* <MentionEditor /> */}
          {/* <TextArea setPostBody={setPostBody} tag={tag} postType={postType} /> */}

          <Tiptap setPostBody={setPostBody} />

        </div>      

        {/* Pass the card for review to the review area */}
        {/* <button onClick={()=>{dispatch(addItem({postTitle, postType, postBody}))}}>Submit for Review</button> */}
      </div>
    </div>
  )
}
