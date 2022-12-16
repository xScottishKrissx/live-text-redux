import React from 'react'
import AddImageButton from './addImageButton'
import AddLinkButton from './addLinkButton'
import './TipTapMenuButtons.css'

export default function TipTapMenuButtons({editor}) {
  return (
    <div className='author-input-text-editor-buttons'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={ !editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                bold</button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={ !editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                Italic </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={ !editor.can().chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                Underline </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={ !editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                Strike </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={ !editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                Code </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                toggleBulletList </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                toggleOrderedList </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                left </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                center </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                right </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                justify </button>
                <AddLinkButton editor={editor} />

                <button onClick={()=>editor.commands.clearContent()}>Clear</button>

                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                undo </button>

                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                redo </button>

                <AddImageButton editor={editor} />


    </div>
  )
}
