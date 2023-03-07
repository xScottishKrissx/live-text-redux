import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addItem } from '../../features/item'
import PostControl from '../PostControl/postControl'
import EditPostField from '../EditPost/editPostField'
import EditTextArea from '../EditPost/editTextArea'
import Title from '../InputForm/title'
import Subtitle from '../InputForm/Subtitle'
import Twitter from '../InputForm/Twitter'

const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
export default function NewPost({handleEdit}) {
    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState("")
    const [postSubtitle, setPostSubTitle] = useState("")
    const [postType, setPostType] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postImageName, setPostImageName] = useState("")
    const [insertTweet, setTweet] = useState("")
    const [insertYoutube, setYoutube] = useState("")
    const [clearContent, setClearContent] = useState(false)

    useEffect(() => {
        dispatch(addItem({postTitle,postSubtitle, postType, postBody, postImageName, insertTweet, insertYoutube}))
      },[postTitle,postSubtitle, postBody, postType, postImageName, insertTweet, insertYoutube])
  return (
    <>
        <h1>New Post</h1>

        <PostControl  
        handleEdit={handleEdit}
        setClearContent={setClearContent} 
        setPostImageName={setPostImageName} 
        title={postTitle} 
        body={postBody} 
        subtitle={postSubtitle} 
        />


        {/* <div className='author-input-form-title'>
            <div className="author-input-field">
                <h3>Title</h3>
                <EditPostField field={""} passNewFieldValue={setPostTitle}  />
            </div>
        </div> */}

        <Title field={""} passNewFieldValue={setPostTitle}/>
        <Subtitle field={""} passNewFieldValue={setPostSubTitle} />
        <Twitter setTweet={setTweet} value={insertTweet}/>
        {/* <div className='author-input-form-subtitle' >
            <div className='author-input-field'>
                <h3>Subtitle</h3>
                <EditPostField field={""} passNewFieldValue={setPostSubTitle} />
            </div>
        </div> */}

        {/* <div className='author-input-form-insert-tweet'>
            <div className='author-input-field'>
                <h3>Tweet Id (optional) </h3>
                <div>
                    <input ref={tweetIdRef} type="text" onChange={(e)=>setTweet(e.target.value)} value={insertTweet}/>
                </div>
            </div>
        </div> */}

        <div className="author-input-form-text-area">
            <div className='author-input-text-editor'>
                <EditTextArea field={""} passNewFieldValue={setPostBody} setPostImageName={setPostImageName}/>
            </div>
        </div>
    </>
  )
}
