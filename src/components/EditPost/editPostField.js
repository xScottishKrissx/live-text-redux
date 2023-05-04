// React
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../../features/resetForm";
// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import suggestion from "../Tiptap/Mentions/suggestion";
// Me
import AddNewButton from "../Utility/Buttons/addNewButton";
import Mention from "@tiptap/extension-mention";

import { FaUndo } from "react-icons/fa";
export default function EditPostField({field, passNewFieldValue, clearContent, createNewColumn, needButton, allowPost,}) {

    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Mention.configure({
                HTMLAttributes:{
                    class:'mention'
                },
                suggestion
            }),
            
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

    // Clear form after a post is submitted/edited
    const dispatch = useDispatch()
    const clrForm = useSelector((state) => state.reset.value)

    useEffect(() =>{
        if(clrForm === "clearForm"){
            editor.commands.clearContent()
            dispatch(setForm(""))
            return
        }
    })

    
    const handleCreateColumn = () =>{
        createNewColumn()
        editor.commands.clearContent()
    }

    // Keyboard Support for the Control Panel Title Field
    const handleKeyPress = (event) => event.key === 'Enter' && handleCreateColumn() 
    
   
  return (
    <>
    {!needButton ? 

            <EditorContent editor={editor}  />
        
    
        :
        <>
            <EditorContent editor={editor} onKeyDown={handleKeyPress} />
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
