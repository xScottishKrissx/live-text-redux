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

import { setForm } from '../../features/resetForm'
import UploadImageBtn from '../Utility/uploadImage'
import {v4 as uuidv4} from 'uuid'

export const MenuBar = ({editor}) =>{ 
    if(!editor){ 
        return null 
    } return (
        <div >
            <TipTapMenuButtons editor={editor} />
        </div>
    )
 }

export default function EditTextArea({field, passNewFieldValue, setPostImageName}) {


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
            console.log(json)
            passNewFieldValue(json)
        },
    })

    // Clear form after a post is submitted/edited
    const dispatch = useDispatch()
    const clrForm = useSelector((state) => state.reset.value)
    const inputStyle = useSelector((state) => state.cPanelStyle.value)

    useEffect(() =>{
        if(clrForm === "clearForm"){
            editor.commands.clearContent()
            dispatch(setForm(""))
            return
        }
    })

    const addTag = (tag) =>{ editor.commands.insertContent(tag + " ") }

    return (
        <div className='author-input-text-editor'>

            <MenuBar editor={editor} inputStyle={inputStyle} /> 
            <FloatingMenuBar editor={editor}/>
            {inputStyle ? <UploadImageBtn setPostImageName={setPostImageName} /> : null }

            <div className="author-input-text-area">
                <div className="defaultBtnStyle">
                    <span>Body (type @ for tags) </span>
                    <EditorContent className='author-input-text-editor-input-container' editor={editor}  />
                </div>
            </div>
            
            {inputStyle ? <TagsView addTag={addTag} /> : null  }
            
        </div>
    )
}
