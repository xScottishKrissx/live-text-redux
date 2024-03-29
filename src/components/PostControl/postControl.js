import React, {useEffect} from 'react'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'
// Me
import PostControlView from './postControlView'
import updateLiveText from './PostControlComponents/updateLiveText'
import deletePost from './PostControlComponents/deletePost'
// Unique Id
import {v4 as uuidv4} from 'uuid'
// Style
import './postControl.css'
import { setCPanelVis } from '../../features/cpanelVis'

export default function PostControl({id, handleEdit, body, subtitle, title, type,tweet, youtube, image, editMode, hide,setPostImageName, hidden, confirmClearForm}) {

    const dispatch = useDispatch()
    const activeLiveText = useSelector((state) => state.active.value)
    
    const liveTexts = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    // console.log(liveTexts)

    const getCurrentColumn = liveTexts.filter(x => x[activeLiveText])
    const getRemainingColumns = liveTexts.filter(x => !x[activeLiveText])
   
    const currentColumnItems = getCurrentColumn[0][activeLiveText].items
    const getCurrentPost = currentColumnItems.filter(x => x[id])

    let getPostId = getCurrentPost.length > 0 ? Object.keys(getCurrentPost[0]) : "newPost"
    let getColumnId = Object.keys(getCurrentColumn[0])
    let currentPostItems = getCurrentPost.length > 0 ? getCurrentPost[0][getPostId[0]].items : "newPost"
    let getColumnItems = getCurrentColumn[0][getColumnId].items
    
    useEffect(() => {
        
        // Keyboard support for Control + Enter
        const handleKeyPress = (event) => event.ctrlKey && event.key === "Enter" && createNewPost()
        
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [title, body])
    

    const createNewPost = () =>{
        console.log("Create New Post")
        const newPost = {
            body:body, 
            title:title, 
            subtitle:subtitle, 
            type: !type ? "update" : type,
            timestamp:Date.now(),
            hidden:false,
            image:image,
            tweet:tweet,
            youtube:youtube
        }

        const newPostData = { [uuidv4()]: { type:"NewPost", items:newPost } }
        getCurrentColumn[0][activeLiveText].items.push(newPostData)
        const updatedLiveTexts = [...getCurrentColumn, ...getRemainingColumns]

        setPostImageName("")
        updateWebsite(updatedLiveTexts)
        confirmClearForm("clearForm")
    }

    const handleHide = (setHide) =>{
        const newPostItems = {...currentPostItems, hidden:setHide}
        const updateCurrentPost = {...getCurrentPost[0][getPostId], items:newPostItems}
        updateLiveText(updateCurrentPost, getColumnItems,  getPostId, getColumnId, liveTexts, updateWebsite, "keepOpen") 
        
    }

    const handleSaveEdit = () =>{
        const newPostItems = {...currentPostItems, body, title, subtitle, tweet, youtube, image, type, hidden}
        const updateCurrentPost = {...getCurrentPost[0][getPostId], items:newPostItems}
        updateLiveText(updateCurrentPost, getColumnItems, getPostId, getColumnId, liveTexts, updateWebsite)   
        dispatch(setCPanelVis(true))
    }
     
    const updateWebsite = (newMasterLiveText, keepOpen) =>{
        // const handleKeyPress = (event) => event.ctrlKey && event.key === "Enter" && createNewPost()
       
        // if(keepOpen?.includes("keepOpen")){ }else{ handleEdit(false) }
        if(keepOpen === "keepOpen"){ }else{ handleEdit(false) }

        console.log(newMasterLiveText)
        dispatch(updateArray(newMasterLiveText))
        localStorage.setItem("liveTextMaster", JSON.stringify(newMasterLiveText))    
    }

    const handleDelete = () => {
        deletePost(getCurrentColumn, getColumnId, getPostId, liveTexts, updateWebsite) 
        dispatch(setCPanelVis(true))
    }
    return (
       
        <PostControlView
            title={title}
            body={body}
            hidden={hidden}
            editMode={editMode}
            handleSaveEdit={handleSaveEdit}
            createNewPost={createNewPost}
            handleDelete={handleDelete}
            handleHide={handleHide}
        />
    )
}
