import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/item'
import './author-input.css'

const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
export default function AuthorInput() {
  const dispatch = useDispatch()

  const [postTitle, setPostTitle] = useState("")
  const [postType, setPostType] = useState("")
  const [postBody, setPostBody] = useState("")
  const [postForReview, setPostForReview] = useState({postTitle:"", postType:"", postBody:""})
  // console.log(postForReview)
  console.log(postType)

  return (
    <div className='author-input-wrapper'>
      <div className='author-input-form'>
 
        <div className='author-input-form-title'>
          {/* <label htmlFor="title">Enter Title</label> */}
          <input type="text" placeholder='Enter Title..' name='title' onChange={(e)=>setPostTitle(e.target.value)}/>
        </div>
 
      <div className="author-input-form-type-select">
        <div className='author-input-form-type-select-items'>
          {typeRange.map((item) => {
            const removeSpacesFromName = item.replace(/\s+/g, '')
            return(
              <div onClick={()=>setPostType(removeSpacesFromName)} id={removeSpacesFromName}>{item}</div>
            )
          })}
        </div>
      </div>

        {/* Write the main body of the card */}
        {/* <textarea id="w3review" name="w3review" rows="4" cols="50" /> */}
        
        {/* Instead of typing out a whole name, click on one of the pre-loaded names to insert it into the text area */}
        {/* <p>Player One Player Two Player 3 Player 4 etc</p> */}

        {/* Pass the card for review to the review area */}
        {/* <button onClick={()=>{dispatch(addItem({postTitle, postType, postBody}))}}>Submit for Review</button> */}
      </div>
    </div>
  )
}
