import React,{useEffect, useRef} from 'react'

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

import { FaCheck, FaCross, FaRemoveFormat, FaTimes } from 'react-icons/fa'


export const MenuBar = ({editor}) =>{ if(!editor){ return null } return <TipTapMenuButtons editor={editor} />; }

const Tiptap = ({setPostBody, location, clearContent, setClearContent, setPostImageName, setTweet}) =>{
    const imageName = useRef()
    const tweetIdRef =  useRef()
    const youtubeUrlRef =  useRef()
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
        
        content:''
    })

      
    useEffect(() =>{
        if(!editor) return
        editor.setOptions({
            editorProps: {
              attributes: {
                // class: 'author-input-text-editor-input',
                class: location === "text-area" ? 'author-input-text-editor-input' : ''
              },
            },
        })
    },[editor])

    useEffect(() =>{
        if(!editor?.getHTML) return  
        setPostBody(editor.getHTML())
        setClearContent(false)

    },[editor?.getHTML()])

    const addTag = (tag) =>{
        editor.commands.insertContent(tag + " ")
    }

    if(clearContent) {
        editor.commands.clearContent()
    }

    const getFileName = (e) =>{
        let getValue = imageName.current.value
        const readyImageName = getValue.replace(`C:\\fakepath\\`, '')
        setPostImageName(readyImageName)
      }
    const removeImage = () =>{
        imageName.current.value = ""
        setPostImageName(null)
    }
    
    // console.log(editor.getHTML())
    return (
        <>
        {location === "text-area" ? 
        // "Text Area" 
        <div className='author-input-text-editor'>
            <MenuBar editor={editor} />
            <FloatingMenuBar editor={editor}/>
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
            <EditorContent className='author-input-text-editor-input-container' editor={editor}  />
            <TagsView addTag={addTag} />
        </div>
        
        : null }

        {location === "title-enter" ?    
            <div className='author-input-field'>
                <h3>Title</h3>
                <EditorContent editor={editor} />
            </div>
        : null}

        {location === "subtitle-enter" ?    

            <div className='author-input-field'>
                <h3>Subtitle</h3>
                <EditorContent editor={editor} />
            </div>
        
        : null}

        
        {location === "insert-tweet" ?    

            <div className='author-input-field'>
                <h3>Tweet Id (optional) </h3>
                <div>
                    <input ref={tweetIdRef} type="text" onChange={(e)=>setPostBody(e.target.value)} />
                </div>
            </div>
        
        : null}
        {location === "insert-youtube" ?    

            <div className='author-input-field'>
                <h3>Youtube Video Url (optional) </h3>
                <div>
                    <input ref={youtubeUrlRef} type="text" onChange={(e)=>setPostBody(e.target.value)} />
                </div>
            </div>
        
        : null}
        </>
    )

}

export default Tiptap