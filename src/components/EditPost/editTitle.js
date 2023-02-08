import { useEditor, EditorContent, onUpdate } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function EditTitle({title, passTitle}) {

    const editor = useEditor({
        
        extensions: [
            StarterKit,
        ],
        content: title,
        onUpdate:({editor}) => {
            const json = editor.getHTML()
            passTitle(json)
        },
    })



  return <EditorContent editor={editor} />
  
}
