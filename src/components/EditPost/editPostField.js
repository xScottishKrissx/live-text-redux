import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSelector, useDispatch } from "react-redux";
import { setForm } from "../../features/resetForm";

export default function EditPostField({field, passNewFieldValue, clearContent}) {

    const dispatch = useDispatch()
    const resetStatus = useSelector((state) => state.reset.value)
    // console.log(resetStatus)
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],

        content: field,

        editorProps:{
            attributes:{
                class: 'focus-visible:outline-none',
            },
        },

        
        onUpdate:({editor}) => {
            const json = editor.getHTML()
            passNewFieldValue(json)
        },

        
        


    })

  return <EditorContent editor={editor} />
    
}
