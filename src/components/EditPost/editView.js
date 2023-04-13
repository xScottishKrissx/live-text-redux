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
    
    // console.log(id)
    const liveText = useSelector((state) => state.livetext.value)
    const activeLiveText = useSelector((state) => state.active.value)
    const getCurrentColumn = liveText.filter(x => x[activeLiveText])
    const currentColumnItems = getCurrentColumn[0][activeLiveText].items
    const getCurrentPost = currentColumnItems.filter(x => x[id])
    
    // return
    
    const {title, subtitle, body, tweet, youtube, image, hidden } = getCurrentPost[0][id].items
    
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
                hidden={hidden}
                
                handleEdit={handleEdit}
                title={postTitle} 
                body={postBody} 
                subtitle={postSubtitle} 
                image={postImageName}
                type={postType}
                tweet={insertTweet}
                youtube={insertYoutube}
            />

            <div className='author-input-edit-form-wrapper'>
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