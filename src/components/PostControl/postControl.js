import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import {v4 as uuidv4} from 'uuid'

import './postControl.css'

import { setCPanelVis } from '../../features/cpanelVis'

import updateLiveText from './PostControlComponents/updateLiveText'
import PostControlView from './postControlView'

import deletePost from './PostControlComponents/deletePost'
import { FaChessKing } from 'react-icons/fa'

export default function PostControl({id, handleEdit, body, subtitle, title, type,tweet, youtube, image, editMode, hide,setPostImageName, hidden}) {

    // localStorage.clear()
    const dispatch = useDispatch()
    const activeLiveText = useSelector((state) => state.active.value)
    
    const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const liveTextMaster2 = useSelector((state) => state.livetext.value)
    // console.log(liveText)
    // console.log(liveTextMaster)
    const [liveTexts, setLiveTexts] = useState(liveTextMaster2)

    const getCurrentColumn = liveTexts.filter(x => x[activeLiveText])
    const getRemainingColumns = liveTexts.filter(x => !x[activeLiveText])
   
    const currentColumnItems = getCurrentColumn[0][activeLiveText].items
    const getCurrentPost = currentColumnItems.filter(x => x[id])

    let getPostId = getCurrentPost.length > 0 ? Object.keys(getCurrentPost[0]) : "newPost"
    let getColumnId = Object.keys(getCurrentColumn[0])
    let currentPostItems = getCurrentPost.length > 0 ? getCurrentPost[0][getPostId[0]].items : "newPost"
    let getColumnItems = getCurrentColumn[0][getColumnId].items
    let getColumnHeadline = getCurrentColumn[0][getColumnId].headline
    // console.log(getColumnHeadline)

    const createNewPost = () =>{
        console.log("Create New Post")

        const newPost = {
            body:body, 
            title:title, 
            subtitle:subtitle, 
            type:type,
            timestamp:Date.now(),
            hidden:false,
            image:image,
            tweet:tweet,
            youtube:youtube
        }

        const newPostData = { [uuidv4()]: { type:"NewPost", items:newPost } }
        // console.log(newPostData)
        // console.log(getCurrentColumn[0][activeLiveText].items)
        getCurrentColumn[0][activeLiveText].items.push(newPostData)
        // const updatedItems = { ...getCurrentColumn[0][activeLiveText].items, ...newPostData }
        // getCurrentColumn[0][activeLiveText].items = updatedItems
        // const currentColumn = getCurrentColumn[0]
        // const newItems = { ...currentColumn[activeLiveText].items, ...newPostData }
        // const updatedColumn = { ...currentColumn, [activeLiveText]: { ...currentColumn[activeLiveText], items: newItems } }
        // console.log(updatedColumn)
        
        const updatedLiveTexts = [...getCurrentColumn, ...getRemainingColumns]
        // const updatedLiveTexts = [updatedColumn, ...getRemainingColumns]
        // console.log(updatedLiveTexts)
        
        setPostImageName("")
        updateWebsite(updatedLiveTexts)
    }

    const handleHide = (setHide) =>{
        const newPostItems = {...currentPostItems, hidden:setHide}
        const updateCurrentPost = {...getCurrentPost[0][getPostId], items:newPostItems}
        updateLiveText(updateCurrentPost, getColumnItems,  getPostId, getColumnId, liveTexts, updateWebsite,  getColumnHeadline, "keepOpen") 
    }

    const handleSaveEdit = () =>{
        console.log(getColumnHeadline)
        const newPostItems = {...currentPostItems, body, title, subtitle, tweet, youtube, image, type, hidden}
        const updateCurrentPost = {...getCurrentPost[0][getPostId], items:newPostItems}
        updateLiveText(updateCurrentPost, getColumnItems, getPostId, getColumnId, liveTexts, updateWebsite, getColumnHeadline)   
    }
     
    const updateWebsite = (newMasterLiveText, keepOpen) =>{
        // console.log(keepOpen)
        if(keepOpen?.includes("keepOpen")){
            // dispatch(updateArray(newMasterLiveText))
        }else{
            dispatch(setCPanelVis(true))
            handleEdit(false)
        }
        // console.log(newMasterLiveText)
        dispatch(updateArray(newMasterLiveText))
        localStorage.setItem("liveTextMaster", JSON.stringify(newMasterLiveText))    
    }

    const handleDelete = () => deletePost(getCurrentColumn, getColumnId, getPostId, liveTexts, updateWebsite) 
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
