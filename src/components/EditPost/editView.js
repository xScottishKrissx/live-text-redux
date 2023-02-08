import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from "../../features/live-text";
import EditPostField from "./editPostField";

const EditTiptap = ({id, readyPostTitle, subtitle, body, handleEdit}) =>{

    const dispatch = useDispatch()

    const liveText = useSelector((state) => state.livetext.value)

    const [titleField, setTitle] = useState(readyPostTitle)
    const [subtitleField, setSubtitle] = useState(subtitle)
    const [bodyField, setBody] = useState(body)

    const saveEdit = () =>{
        const getCurrentPost = liveText.filter(x => x.id === id)
        const updateCurrentPost = getCurrentPost.map(item =>{
            if(item.id === id) return {...item, body:bodyField, title:titleField, subtitle:subtitleField}
        })

        const remainingPosts = liveText.filter(x => x.id !== id) 
        const mergeObjects = [...remainingPosts, ...updateCurrentPost]
        updateWebsite(mergeObjects)  

    }
    
    // THis should be a separate function as it's u
    const updateWebsite = (newArray) =>{
        dispatch(updateArray(newArray))
        localStorage.setItem("live-text", JSON.stringify(newArray))   
        handleEdit(false)
    }

    return (
        <div>
            <div className='post-item-headline-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

                <div className='post-item-headline-content '>
                    <div className='post-item-title'>
                        {/* {hidden ? <div> ** Hidden ** </div>  : <div> // Live \\ </div> } */}
                        <EditPostField field={readyPostTitle} passNewFieldValue={setTitle} />
                    </div>

                    <EditPostField field={subtitle} passNewFieldValue={setSubtitle} />
                    <EditPostField field={body} passNewFieldValue={setBody} />
                </div>
            </div>

            <button onClick={saveEdit}>Save</button>
        </div>
    )
}

export default EditTiptap