import React,{useEffect} from 'react'
// Basic
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Mentions / Suggestions
import Mention from '@tiptap/extension-mention'
import suggestion from './suggestion'

export const MenuBar = ({editor}) =>{
    if(!editor){
        return null
    }
    return (
        <>
              <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    bold
                </button>
        </>
    )
}

const Tiptap = ({setPostBody}) =>{
    const editor = useEditor({
        extensions:[
            StarterKit,
            Mention.configure({
                HTMLAttributes:{
                    class:'mention'
                },
                suggestion
            })
        ],
        content:'<p>Hello World!</p>'

        
    })

    useEffect(() =>{
        // console.log(editor.getJSON())
        if(!editor?.getHTML){
            return 
        }
        setPostBody(editor.getHTML())
    },[editor?.getHTML()])
    
    // console.log(editor.getHTML())
    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor}/>
        </>
    )

}

export default Tiptap