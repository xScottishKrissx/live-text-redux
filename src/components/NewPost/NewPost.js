import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { addItem } from '../../features/item'
import PostControl from '../PostControl/postControl'

import Title from '../InputForm/Title'
import Subtitle from '../InputForm/Subtitle'
import Twitter from '../InputForm/Twitter'
import Youtube from '../InputForm/Youtube'
import Type from '../InputForm/Type'
import TextArea from '../InputForm/TextArea'

export default function NewPost({handleEdit, confirmPost}) {
    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState("")
    const [postSubtitle, setPostSubTitle] = useState("")
    const [postType, setPostType] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postImageName, setPostImageName] = useState("")
    const [insertTweet, setTweet] = useState("")
    const [insertYoutube, setYoutube] = useState("")

    useEffect(() => {
        dispatch(addItem({postTitle,postSubtitle, postType, postBody, postImageName, insertTweet, insertYoutube}))
    },[postTitle,postSubtitle, postBody, postType, postImageName, insertTweet, insertYoutube])


    return (
        <div>
            <PostControl  
                handleEdit={handleEdit}
                setPostImageName={setPostImageName} 
                title={postTitle} 
                body={postBody} 
                subtitle={postSubtitle} 
                confirmPost={confirmPost}
            />
            <div className='author-input-wrapper'>
                <div className='author-input-form'>
                    <Title field={""} passNewFieldValue={setPostTitle}  />
                    <Subtitle field={""} passNewFieldValue={setPostSubTitle} />
                    <Twitter setTweet={setTweet} value={insertTweet}/>
                    <Youtube setYoutube={setYoutube} value={insertYoutube} />
                    <Type setPostType={setPostType} />
                    <TextArea field={""} passNewFieldValue={setPostBody} setPostImageName={setPostImageName}/>
                </div>
            </div>
        </div>
    )
}
