import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostControl from "../PostControl/postControl";
import { addToPreview } from "../../features/previewEdit";

import Title from "../InputForm/Title";
import Subtitle from "../InputForm/Subtitle";
import Twitter from "../InputForm/Twitter";
import Youtube from "../InputForm/Youtube";
import Type from "../InputForm/Type";
import TextArea from "../InputForm/TextArea";

import './editView.css'

const EditTiptap = ({ id, handleEdit }) =>{
    const dispatch = useDispatch()

    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    console.log(getCurrentPost)

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
                     <Youtube value={insertYoutube} setYoutube={setYoutube} />
                    <Type setPostType={setPostType} />
                    <TextArea field={body} passNewFieldValue={setBody} setPostImageName={setPostImageName} />
                </div>
            </div>

        </div>
    )
}

export default EditTiptap