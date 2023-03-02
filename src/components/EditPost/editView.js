import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostControl from "../PostControl/postControl";
import EditPostField from "./editPostField";

import { addToPreview } from "../../features/previewEdit";

import './editView.css'

const EditTiptap = ({

    id, 
    readyPostTitle, 
    // subtitle, 
    // body, 
    handleEdit,
    // setPostTitle

}) =>{
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    // console.log(getCurrentPost[0])
    const {title, subtitle, body } = getCurrentPost[0]
    
    const [postTitle, setTitle] = useState(title)
    const [postSubtitle, setSubtitle] = useState(subtitle)
    const [postBody, setBody] = useState(body)

    useEffect(()=>{
        dispatch(addToPreview({postTitle, postSubtitle, postBody }))
    },[postTitle, postSubtitle, postBody])

    return (
        <div>
            <PostControl 
                editMode 
                id={id} 
                title={postTitle} 
                subtitle={postSubtitle} 
                body={postBody} 
                handleEdit={handleEdit}
            />

            <div className='post-item-headline-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

                <div className='post-item-headline-content '>
                    <div className='post-item-title'>
                        <EditPostField field={title} passNewFieldValue={setTitle}  />
                    </div>

                    <div className='post-item-subtitle' >
                        <EditPostField field={subtitle} passNewFieldValue={setSubtitle} />
                    </div>
                    
                    <EditPostField field={body} passNewFieldValue={setBody} />
                </div>
            </div>

        </div>
    )
}

export default EditTiptap