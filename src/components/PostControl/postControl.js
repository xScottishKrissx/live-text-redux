import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import {v4 as uuidv4} from 'uuid'

import './postControl.css'

import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash} from 'react-icons/fa'
import { setForm } from '../../features/resetForm'
import { clearConfig } from 'dompurify'

export default function PostControl({id, handleEdit, body, subtitle, title, type,tweet, youtube, image, editMode, hide,setPostImageName, confirmPost}) {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const activeLiveText = useSelector((state) => state.active.value)
    // console.log(activeLiveText)
    
    const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
    const [liveTexts, setLiveTexts] = useState(liveTextMaster)
    // console.log(liveTexts)

    // const getCurrentColumn = liveTexts.map((x,property) =>{
    //     // console.log(x)
    //     if(x[property] === activeLiveText){
    //         return console.log(x)
    //     }
    // })

    const getCurrentColumn = liveTexts.filter(x => x[activeLiveText])
    const getRemainingColumns = liveTexts.filter(x => !x[activeLiveText])
    
    // console.log(getRemainingColumns)

    const getCurrentPost = liveText.filter(x => x.id === id)
    const getOtherPosts = liveText.filter(x => x.id !== id)
    // console.log(liveTexts[activeLiveText])


    // const [item, setItem] = useState()
    // localStorage.clear()
    // console.log(item.id)
    const createNewPost = () =>{
        console.log("Create New Post")

        const newPost = {
            id: uuidv4(), 
            body:body, 
            title:title, 
            subtitle:subtitle, 
            type:type,
            // timestamp: dayjs().format('HH:mm - dddd, MMM YYYY'),
            timestamp:Date.now(),
            hidden:false,
            image:image,
            tweet:tweet,
            youtube:youtube
          }

        // console.log(newPost)
        const newPostData = { [uuidv4()]: { type:"NewPost", items:newPost } }
        // console.log(newPostData)
        

        // console.log(liveTexts)
        // console.log(activeLiveText)
        // console.log([liveTexts[0][activeLiveText].items])
        // const addPostToColumn = liveTexts[0][activeLiveText].items.push(newPostData)
        // console.log(getCurrentColumn)
        // console.log(liveTexts)

        getCurrentColumn[0][activeLiveText].items.push(newPostData)
        // console.log(getCurrentColumn)
        // console.log(liveTexts)
        const updatedLiveTexts = [...getCurrentColumn, ...getRemainingColumns]
        // console.log(updatedLiveTexts)

        setLiveTexts(updatedLiveTexts)
        dispatch(updateArray(updatedLiveTexts))
        localStorage.setItem("liveTextMaster", JSON.stringify(updatedLiveTexts))
 
        // console.log(activeLiveText)

        // console.log(test)
        // const currentPosts = 

        // console.log(newPost)

        //   console.log(item.content)
        //   let copy = {...activeLiveText}


        //   console.log(copy)
          
          //   let temp = copy.content.concat(newPost)

        //   console.log(item.content.concat(newPost))
        //   const thing = item.content.concat(newPost)
        //   console.log(thing)
          
  
        //   setItem({ ...item, content:thing })

        //   console.log(item)

        //   console.log(item)

        //   console.log(activeLiveText.item)
        //   let test = activeLiveText
        //   let thingy = [...test.item.content, newPost[0]]
        //   console.log(thingy)


        //   activeLiveText.item.content.unshift([...newPost[0]])
        //   const thing = Object.assign([...activeLiveText.item.content], [...newPost[0]])
        //   console.log(thing)
        //   console.log(activeLiveText)
          // console.log(insertTweet)
        //   const updateLiveTextArray = [newPost[0]].concat(liveText)
        //   const updateLiveTextArray = activeLiveText.item.content.unshift(newPost[0])
            // const updateLiveTextArray = [...activeLiveText.item.content, newPost[0]]
        //   console.log(updateLiveTextArray)


        //   console.log(liveText)
        //   console.log(updateLiveTextArray)
        //   dispatch(updateArray(updateLiveTextArray))
        //   localStorage.setItem("live-text", JSON.stringify(updateLiveTextArray))
        //   setPostImageName("")
        //   dispatch(setForm(true))
 
        //   confirmPost()


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
        const editCurrentPost = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, body, title, subtitle, tweet, youtube, image, type, }
        })
        updateWebsite(editCurrentPost)          
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
