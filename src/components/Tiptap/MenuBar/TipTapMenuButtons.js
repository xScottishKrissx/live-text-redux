import React from 'react'
import AddImageButton from './addImageButton'
import AddLinkButton from './addLinkButton'
import './TipTapMenuButtons.css'
// Icons
import { 
    FaBold, 
    FaItalic, 
    FaUnderline, 
    FaStrikethrough, 
    FaCode, 
    FaListUl, 
    FaListOl,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaAlignJustify,
    FaLink,
    FaUnlink,
    FaEraser,
    FaUndo,
    FaRedo,
    FaImage
 } from 'react-icons/fa'

export default function TipTapMenuButtons({editor}) {
   

  return (
    <div className='author-input-text-editor-buttons'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={ !editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <FaBold />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={ !editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                <FaItalic /> </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={ !editor.can().chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                <FaUnderline /> </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={ !editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                <FaStrikethrough /> </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={ !editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                <FaCode /> </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                <FaListUl /> </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                <FaListOl /> </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                <FaAlignLeft /> </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                <FaAlignCenter /> </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                <FaAlignRight /> </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                <FaAlignJustify /> </button>
                <AddLinkButton editor={editor} />

                <button onClick={()=>editor.commands.clearContent()}><FaEraser /></button>

                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <FaUndo /> </button>

                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <FaRedo /> </button>

                <AddImageButton editor={editor} />

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                <h1>h1</h1> </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                <h2>h2</h2> </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                <h3>h3</h3> </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                <h4>h4</h4> </button>
                
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                <h5>h5</h5> </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                <h6>h6</h6> </button>


    </div>
  )
}
