import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import DOMPurify from 'dompurify'

const EditTiptap = ({id, readyPostTitle, subtitle}) =>{
    const editor = useEditor({
        
        extensions: [
            StarterKit,
        ],
        content: ''
    })

    const createMarkup = (html) =>{
        return{
            __html:DOMPurify.sanitize(html)
        }
    }
    // editor.commands.insertContent('Example Text')

    console.log(subtitle)
    return (
        <div>
            <div className='post-item-headline-wrapper'>

            {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}

            <div className='post-item-headline-content '>
                <div className='post-item-title'>
                    {/* {hidden ? <div> ** Hidden ** </div>  : <div> // Live \\ </div> } */}
                    <div dangerouslySetInnerHTML={createMarkup(readyPostTitle)}></div>
                </div>
                    <div className='post-item-subtitle'  dangerouslySetInnerHTML={createMarkup(subtitle)}></div>
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

export default EditTiptap