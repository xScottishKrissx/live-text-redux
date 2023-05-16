import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Main Post Control Component
import PostControl from '../PostControl/postControl'
// Input
import Title from '../InputForm/Title'
import Subtitle from '../InputForm/Subtitle'
import Twitter from '../InputForm/Twitter'
import Youtube from '../InputForm/Youtube'
import Type from '../InputForm/Type'
import TextArea from '../InputForm/TextArea'
// Redux
import { setForm } from '../../features/resetForm'
import { addItem } from '../../features/item'
// Utility
import KeyboardShortcuts from '../Utility/keyboardShortcuts'

export default function NewPost({handleEdit}) {
    const dispatch = useDispatch()

    // const inputStyle = useSelector((state) => state.inputStyle.value)
    const inputStyle = useSelector((state) => state.cPanelStyle.value)

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

    const confirmClearForm = (x) =>{
        dispatch(setForm("clearForm"))
        // reset state
        setPostTitle("")
        setPostSubTitle("")
        setPostType("")
        setPostBody("")
        setPostImageName("")
        setTweet("")
        setYoutube("")
    }

    return (
        <>
            <PostControl  
                setPostImageName={setPostImageName} 
                confirmClearForm={confirmClearForm}
                
                handleEdit={handleEdit}
                title={postTitle} 
                body={postBody} 
                subtitle={postSubtitle} 
                image={postImageName}
                type={postType}
                twitter={insertTweet}
                youtube={insertYoutube}
                
            />
            <div className='author-input-form-wrapper'>
                
                <div className='author-input-form'>  
                    <Title field={""} passNewFieldValue={setPostTitle} /> 
                    {inputStyle ? <Subtitle field={""} passNewFieldValue={setPostSubTitle} /> : null }
                    {inputStyle ? <Twitter setTweet={setTweet} value={insertTweet}/> : null }
                    {inputStyle ? <Youtube setYoutube={setYoutube} value={insertYoutube} /> : null }
                    {inputStyle ? <Type setPostType={setPostType} /> : null }
                    <TextArea field={""} passNewFieldValue={setPostBody} setPostImageName={setPostImageName}/>
                </div>

                

            </div>
            <KeyboardShortcuts location={"post"}/>
        </>
    )
}
