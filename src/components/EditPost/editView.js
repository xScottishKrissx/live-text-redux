import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

// import EditTitle from "./editTitle";
import EditPostField from "./editPostField";

const EditTiptap = ({id, readyPostTitle, subtitle, body}) =>{

    const dispatch = useDispatch()
    
    const [titleField, setTitle] = useState(readyPostTitle)
    const [subtitleField, setSubtitle] = useState(subtitle)
    const [bodyField, setBody] = useState(body)

    const saveEdit = () =>{
        console.log(titleField)
        console.log(subtitleField)
        console.log(bodyField)
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