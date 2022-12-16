import React,{useEffect} from 'react'
// Basic
import {useEditor, EditorContent, FloatingMenu} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
// Mentions / Suggestions
import Mention from '@tiptap/extension-mention'
import suggestion from './suggestion'
import TipTapMenuButtons from './TipTapMenuButtons'

export const MenuBar = ({editor}) =>{ if(!editor){ return null } return <TipTapMenuButtons editor={editor} />; }

const Tiptap = ({setPostBody}) =>{
    const editor = useEditor({
        extensions:[
            StarterKit,
            Underline,
            OrderedList,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: true,
            }),
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
        if(!editor?.getHTML){ return  }
        setPostBody(editor.getHTML())
    },[editor?.getHTML()])
    
    // console.log(editor.getHTML())
    return (
        <>
            <MenuBar editor={editor} />
            {editor && 
                <FloatingMenu editor={editor}>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                            >
                                h1
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                            >
                                h2
                            </button>
                </FloatingMenu> 
            
            }
            <EditorContent editor={editor}/>
        </>
    )

}

export default Tiptap