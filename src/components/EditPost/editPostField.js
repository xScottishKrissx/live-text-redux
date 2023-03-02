import { useEditor, EditorContent, onUpdate } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function EditPostField({field, passNewFieldValue}) {

   
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
            // toItemReview(json)
        },

    })

  return <EditorContent editor={editor} />
    
}
