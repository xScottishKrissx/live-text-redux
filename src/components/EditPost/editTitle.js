import { useEditor, EditorContent, onUpdate } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import DOMPurify from 'dompurify'

export default function EditTitle({title, passTitle}) {

    const editor = useEditor({
        
        extensions: [
            StarterKit,
        ],
        content: title,
        onUpdate:({editor}) => {
            const json = editor.getHTML()
            console.log(json)
            passTitle(json)
        },
    })

    const createMarkup = (html) =>{
        return{
            __html:DOMPurify.sanitize(html)
        }
    }

    const getEdit = () =>{
        console.log("Change")
    }
    // console.log(editor)

  return (
    <EditorContent editor={editor} />
  )
}
