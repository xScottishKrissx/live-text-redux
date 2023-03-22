import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import {v4 as uuidv4} from 'uuid'

import './postControl.css'

import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash} from 'react-icons/fa'
import { setForm } from '../../features/resetForm'
import { setCPanelVis } from '../../features/cpanelVis'
import { clearConfig } from 'dompurify'

export default function PostControl({id, handleEdit, body, subtitle, title, type,tweet, youtube, image, editMode, hide,setPostImageName}) {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const activeLiveText = useSelector((state) => state.active.value)
    
    const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const [liveTexts, setLiveTexts] = useState(liveTextMaster)


    const getCurrentColumn = liveTexts.filter(x => x[activeLiveText])
    const getRemainingColumns = liveTexts.filter(x => !x[activeLiveText])
    
    // const getCurrentPost = liveText.filter(x => x.id === id)
    // const getOtherPosts = liveText.filter(x => x.id !== id)

    // const getCurrentColumn = liveText.filter(x => x[activeLiveText])
    const currentColumnItems = getCurrentColumn[0][activeLiveText].items
    const getCurrentPost = currentColumnItems.filter(x => x[id])
    const getOtherPosts = currentColumnItems.filter(x => !x[id])

    const createNewPost = () =>{
        console.log("Create New Post")

        const newPost = {
            // id: uuidv4(), 
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
        getCurrentColumn[0][activeLiveText].items.push(newPostData)
        const updatedLiveTexts = [...getCurrentColumn, ...getRemainingColumns]

        setLiveTexts(updatedLiveTexts)
        dispatch(updateArray(updatedLiveTexts))
        localStorage.setItem("liveTextMaster", JSON.stringify(updatedLiveTexts))
        setPostImageName("")

        dispatch(setCPanelVis(true))
    }



    const handleDelete = () =>{
        console.log("Delete: " + id)
        updateWebsite()
    }

    const handleHide = (setHide) =>{
        const setHidden = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, hidden:setHide}
        })       
        updateWebsite(setHidden)
        console.log("Hide")
    }

    const saveEdit = () =>{

        let getPostId = Object.keys(getCurrentPost[0])
        let getColumnId = Object.keys(getCurrentColumn[0])
        // Update Post
        let currentPostItems = getCurrentPost[0][getPostId[0]].items
        const newPostItems = {...currentPostItems, body, title, subtitle, tweet, youtube, image, type,}
        const updateCurrentPost = {...getCurrentPost[0][getPostId], items:newPostItems}

        ////////// Update Column
        let getColumnItems = getCurrentColumn[0][getColumnId].items
        const updateColumn = getColumnItems.map(x =>{
            if(x[getPostId]){
                return {...x, [getPostId]: updateCurrentPost,}
            }else{
                return x
            }
        })

        /////////// Update Live Texts
        const updateLiveTexts = liveTexts.map(x =>{
            if(x[getColumnId]){
                return{...x, [getColumnId]:  {type:"Column", items:updateColumn}}
            }else{
                return x
            }

        })
        // Update Website
        dispatch(updateArray(updateLiveTexts))
        dispatch(setCPanelVis(true))
        handleEdit(false)
        localStorage.setItem("liveTextMaster", JSON.stringify(updateLiveTexts))      
    }

    const updateWebsite = (changedPost) =>{


        console.log("New Post")
        if(changedPost){
            const mergeObjects = [...getOtherPosts, ...changedPost]
            dispatch(updateArray(mergeObjects))
            localStorage.setItem("live-text", JSON.stringify(mergeObjects))   
        }
        else{
            dispatch(updateArray(getOtherPosts))
            localStorage.setItem("live-text", JSON.stringify(getOtherPosts))   
        }
        dispatch(setForm(true))
        handleEdit(false)

    }

    const closeEdit = () =>{
        handleEdit(false)
    }

    let minChars = 10
    const allowPost = title.length > minChars && body.length > minChars
    return (
        <div className='post-control-bar'>
            {editMode ? 
                    // Edit an Existing Post
                    allowPost ?
                        <button onClick={saveEdit}><FaSave /> Save </button>
                        :
                        <button ><FaSave />Save: Title and Body Required </button>

                    :

                    // Creating a New Post
                    allowPost ? 
                    <button onClick={
                        ()=>{
                            createNewPost()
                            dispatch(setForm(true))

                    }}><FaEdit /> Create New Post</button>
                    : 
                    <button><FaEdit />Create New Post: Title and Body Required</button>
            }
            {editMode ? <button onClick={handleDelete}><FaTrash/> Delete</button> : null }
            
            {hide ?
                <button className='post-control-bar-isHidden' onClick={()=>handleHide(false)}><FaEyeSlash/>Hidden</button>
                :
                <button onClick={()=>handleHide(true)}><FaEye /> Visible</button>
            }
        </div>
    )
}
