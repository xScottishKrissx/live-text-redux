import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/item'
import './author-input.css'
import Tiptap from './Tiptap/Tiptap'

const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
export default function AuthorInput() {
  const dispatch = useDispatch()

  const [postTitle, setPostTitle] = useState("")
  const [postSubTitle, setPostSubTitle] = useState("")
  const [postType, setPostType] = useState("")
  const [postBody, setPostBody] = useState("")
  // const [postForReview, setPostForReview] = useState({postTitle:"", postSubTitle:"", postType:"", postBody:""})
  const [tag, setTag] = useState("true")

  useEffect(() => {
    dispatch(addItem({postTitle,postSubTitle, postType, postBody}))
  },[postTitle,postSubTitle, postBody, postType])



  return (
    <div className='author-input-wrapper'>
      <div className='author-input-form'>
 
        <div className='author-input-form-title'>
          <Tiptap location={"title-enter"} setPostBody={setPostTitle}  />
        </div>

        <div className='author-input-form-subtitle'>
          <Tiptap location={"subtitle-enter"} setPostBody={setPostSubTitle} />
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
          <Tiptap location={"text-area"} setPostBody={setPostBody} placeholder={"Body"}/>
        </div>      

        {/* Pass the card for review to the review area */}
        {/* <button onClick={()=>{dispatch(addItem({postTitle, postType, postBody}))}}>Submit for Review</button> */}
      </div>
    </div>
  )
}
