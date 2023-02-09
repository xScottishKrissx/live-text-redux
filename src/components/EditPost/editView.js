import { useState } from "react";
import PostControl from "../PostControl/postControl";
import EditPostField from "./editPostField";

import './editView.css'

const EditTiptap = ({id, readyPostTitle, subtitle, body, handleEdit}) =>{

    const [titleField, setTitle] = useState(readyPostTitle)
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
                        <EditPostField field={readyPostTitle} passNewFieldValue={setTitle} />
                    </div>

                    <EditPostField field={subtitle} passNewFieldValue={setSubtitle} />
                    <EditPostField field={body} passNewFieldValue={setBody} />
                </div>
            </div>

        </div>
    )
}

export default EditTiptap