import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import DOMPurify from 'dompurify'
import EditTitle from "./editTitle";

const EditTiptap = ({id, readyPostTitle, subtitle, body}) =>{
    const [title, setTitle] = useState(readyPostTitle)
    const editor = useEditor({
        
        extensions: [
            StarterKit,
        ],
        editable:true,
        content: ''
    })

    const createMarkup = (html) =>{
        return{
            __html:DOMPurify.sanitize(html)
        }
    }
    // editor.commands.insertContent('Example Text')

    const saveEdit = () =>{
        console.log("Save!")
        console.log(readyPostTitle)
        console.log(title)
    }

    console.log(body)
    return (
        <div>
            <div className='post-item-headline-wrapper'>

            {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

            <div className='post-item-headline-content '>
                <div className='post-item-title'>
                    {/* {hidden ? <div> ** Hidden ** </div>  : <div> // Live \\ </div> } */}
                    {/* <div dangerouslySetInnerHTML={createMarkup(readyPostTitle)}></div> */}
                <EditTitle title={readyPostTitle} passTitle={setTitle}/>
                </div>
                    {/* <div className='post-item-subtitle'  dangerouslySetInnerHTML={createMarkup(subtitle)}></div> */}
                    {/* <div className='post-item-body'  dangerouslySetInnerHTML={createMarkup(body)}></div> */}
                    {/* <p>Editing</p> */}
                </div>
            </div>
            {/* <EditorContent editor={editor} /> */}
            <button onClick={saveEdit}>Save</button>
        </div>
    )
}

export default EditTiptap