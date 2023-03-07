import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostControl from "../PostControl/postControl";
import EditPostField from "./editPostField";

import { addToPreview } from "../../features/previewEdit";

import './editView.css'
import EditTextArea from "./editTextArea";
import EditType from "./editType";
import Title from "../InputForm/title";
import Subtitle from "../InputForm/Subtitle";
import Twitter from "../InputForm/Twitter";

const typeRange = ["Goal","Offside", "Yellow Card", "Red Card", "Breaking","Update"]
const EditTiptap = ({ id, handleEdit }) =>{
    const dispatch = useDispatch()
    const tweetIdRef =  useRef()
    const youtubeUrlRef =  useRef()

    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    const {title, subtitle, body, tweet, youtube, image } = getCurrentPost[0]
    
    const [postTitle, setTitle] = useState(title)
    const [postSubtitle, setSubtitle] = useState(subtitle)
    const [postType, setPostType] = useState("")
    const [postBody, setBody] = useState(body)
    const [postImageName, setPostImageName] = useState(image)
    const [insertTweet, setTweet] = useState(tweet)
    const [insertYoutube, setYoutube] = useState(youtube)

    useEffect(()=>{
        dispatch(addToPreview({postTitle, postSubtitle,postType, insertTweet,insertYoutube, postBody,postImageName }))
    },[postTitle, postSubtitle, postType, insertTweet, insertYoutube, postBody, postImageName])

    return (
        <div>
            <PostControl 
                editMode 
                id={id} 
                title={postTitle} 
                subtitle={postSubtitle} 
                type={postType}
                tweet={insertTweet}
                youtube={insertYoutube}
                body={postBody} 
                image={postImageName}
                handleEdit={handleEdit}
            />

            <div className='author-input-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

                <div className='author-input-form'>
                    <Title field={title} passNewFieldValue={setTitle}/>
                    <Subtitle field={subtitle} passNewFieldValue={setSubtitle} />


                    <Twitter setTweet={setTweet} value={insertTweet}/>
                    {/* <div className='author-input-form-insert-tweet'>
                        <div className='author-input-field'>
                            <h3>Tweet Id (optional) </h3>
                            <div>
                                <input ref={tweetIdRef} type="text" onChange={(e)=>setTweet(e.target.value)} value={insertTweet}/>
                            </div>
                        </div>
                    </div> */}

                    
                    <div className='author-input-form-insert-youtube'>
                        <div className='author-input-field'>
                            <h3>Youtube Video Url (optional) </h3>
                            <div>
                                <input ref={youtubeUrlRef} type="text" onChange={(e)=>setYoutube(e.target.value)} value={insertYoutube} />
                            </div>
                        </div>
                    </div>

                    <div className="author-input-form-type-select">
                        <div className='author-input-form-type-select-items'>
                            <EditType typeRange={typeRange} setPostType={setPostType} />
                        </div>
                    </div>

                    <div className="author-input-form-text-area">
                        <div className='author-input-text-editor'>
                            <EditTextArea field={body} passNewFieldValue={setBody} setPostImageName={setPostImageName}/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditTiptap