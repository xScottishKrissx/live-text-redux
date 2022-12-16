import React,{useEffect} from 'react'
// Basic
import {useEditor, EditorContent, FloatingMenu} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
// import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
// Is in use even if it's grey, placing here for consistency
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
// Mentions / Suggestions
import Mention from '@tiptap/extension-mention'
import suggestion from './Mentions/suggestion'
import TipTapMenuButtons from './MenuBar/TipTapMenuButtons'
import FloatingMenuBar from './FloatingMenu/FloatingMenuBar'
import TagsView from '../Tags/tags-view'

export const MenuBar = ({editor}) =>{ if(!editor){ return null } return <TipTapMenuButtons editor={editor} />; }

const Tiptap = ({setPostBody}) =>{
    const editor = useEditor({

        extensions:[
            StarterKit,
            Underline,
            // OrderedList,
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: true,
                linkOnPaste: false,
                validate: href => /^https?:\/\//.test(href),
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
        if(!editor) return
        editor.setOptions({
            editorProps: {
              attributes: {
                class: 'author-input-text-editor-input',
              },
            },
        })
    },[editor])

    useEffect(() =>{
        if(!editor?.getHTML) return  
        setPostBody(editor.getHTML())

    },[editor?.getHTML()])

    const addTag = (tag) =>{
        editor.commands.insertContent(tag + " ")
    }
    
    // console.log(editor.getHTML())
    return (
        <div className='author-input-text-editor'>
            <MenuBar editor={editor} />
            <FloatingMenuBar editor={editor}/>
            <EditorContent className='author-input-text-editor-input-container' editor={editor}/>
            {/* <div onClick={addThing}>Add Thing</div> */}
            <TagsView addTag={addTag} />
        </div>
    )

}

export default Tiptap