import React, {useRef, useEffect} from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { useSelector, useDispatch } from 'react-redux'

// TipTap
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Mention from '@tiptap/extension-mention'


import suggestion from '../Tiptap/Mentions/suggestion'
import TipTapMenuButtons from '../Tiptap/MenuBar/TipTapMenuButtons'
import FloatingMenuBar from '../Tiptap/FloatingMenu/FloatingMenuBar'
import TagsView from '../Tags/tags-view'
// Icons
import {FaTimes } from 'react-icons/fa'

import { setForm } from '../../features/resetForm'

export const MenuBar = ({editor}) =>{ if(!editor){ return null } return <TipTapMenuButtons editor={editor} />; }

export default function EditTextArea({field, passNewFieldValue, setPostImageName}) {

    const imageName = useRef()

    const editor = useEditor({

        extensions:[
            StarterKit,
            Underline,
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
        
        content:field,

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

    const getFileName = (e) =>{
        let getValue = imageName.current.value
        const readyImageName = getValue.replace(`C:\\fakepath\\`, '')
        setPostImageName(readyImageName)
    }
    
    const removeImage = () =>{
        imageName.current.value = ""
        setPostImageName(null)
    }

    const addTag = (tag) =>{
        editor.commands.insertContent(tag + " ")
    }

  return (
    <div className='author-input-text-editor'>
{/* The Buttons above the text area */}
        <MenuBar editor={editor}/>
{/* Floating Menu */}
        <FloatingMenuBar editor={editor}/>

{/* Image Upload */}
        <div className='author-input-text-editor-upload-image'>
            <form className='author-input-form-upload-image-button'>
                <input ref={imageName} type="file" id="myfile" name="myfile" onChange={(e)=>getFileName(e)}/>
                {imageName.current?.value.length > 1 ? 
                    <button type='button' value="Browse..." onClick={()=>removeImage()}>Remove Image - <FaTimes /></button>  
                    : 
                    <button type='button' value="Browse..." onClick={()=>imageName.current.click()}>Upload Image +</button>     
                }
            </form>
        </div>

{/* The actual text area */}
        <EditorContent className='author-input-text-editor-input-container' editor={editor}  />
        <TagsView addTag={addTag} />
    </div>
  )
}
