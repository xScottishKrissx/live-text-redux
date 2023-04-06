import { useEditor, EditorContent } from "@tiptap/react";
// import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
// import { useSelector, useDispatch } from "react-redux";
// import { setForm } from "../../features/resetForm";
import AddNewButton from "../Utility/Buttons/addNewButton";
export default function EditPostField({field, passNewFieldValue, clearContent, createNewColumn, needButton, allowPost}) {
    // console.log(needButton)
    // const dispatch = useDispatch()
    // const resetStatus = useSelector((state) => state.reset.value)
    // console.log(field)
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

    const handleCreateColumn = () =>{
        // console.log("handleCreateColumn")
        // const json = editor.getHTML()
        // passNewFieldValue(json)
        createNewColumn()
        editor.commands.clearContent()
    }

   
  return (
    <>
    {!needButton ? 
        <EditorContent editor={editor} />
        :
        <>
            <EditorContent editor={editor} />
            {allowPost ? 
                <AddNewButton handleClick={handleCreateColumn} title="Create New Column"/> 
                : 
                <AddNewButton greyOut title="Column name too short"/>  
            }
        </>
}
    </>
  )
}
