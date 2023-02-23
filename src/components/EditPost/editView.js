import { useState } from "react";
import { useSelector } from "react-redux";
import PostControl from "../PostControl/postControl";
import EditPostField from "./editPostField";

import './editView.css'

const EditTiptap = ({

    id, 
    readyPostTitle, 
    // subtitle, 
    // body, 
    handleEdit

}) =>{

    const liveText = useSelector((state) => state.livetext.value)
    const getCurrentPost = liveText.filter(x => x.id === id)
    // console.log(getCurrentPost[0])
    const {title, subtitle, body } = getCurrentPost[0]
    
    const [titleField, setTitle] = useState(title)
    const [subtitleField, setSubtitle] = useState(subtitle)
    const [bodyField, setBody] = useState(body)

    return (
        <div>
            <PostControl 
                editMode 
                id={id} 
                body={bodyField} 
                subtitle={subtitleField} 
                title={titleField} 
                handleEdit={handleEdit}
            />

            <div className='post-item-headline-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

                <div className='post-item-headline-content '>
                    <div className='post-item-title'>
                        <EditPostField field={title} passNewFieldValue={setTitle} />
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