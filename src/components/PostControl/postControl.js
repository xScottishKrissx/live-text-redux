import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import {v4 as uuidv4} from 'uuid'

import './postControl.css'

import { FaSave, FaEdit, FaTrash, FaEye, FaEyeSlash} from 'react-icons/fa'
import { setForm } from '../../features/resetForm'

export default function PostControl({id, handleEdit, body, subtitle, title, type,tweet, youtube, image, editMode, hide,setPostImageName, confirmPost, liveTextId}) {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const activeLiveText = useSelector((state) => state.active.value)
    // console.log(activeLiveText)
    const getCurrentLiveText = liveText.filter(x => x.id === activeLiveText)

    const getCurrentPost = liveText.filter(x => x.id === id)
    const getOtherPosts = liveText.filter(x => x.id !== id)

    const [item, setItem] = useState({id:activeLiveText.item.id, content:[{title:"Test"}]})
    // localStorage.clear()
    // console.log(item.id)
    const createNewPost = () =>{
        console.log("Create New Post")

        const newPost = [{
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
          }]
          console.log(item.content)
          console.log(newPost)
        //   console.log(item.content.concat(newPost))
          const thing = item.content.concat(newPost)
          console.log(thing)
          
  
          setItem({
            ...item,
            content:thing
          })

          console.log(item)

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
