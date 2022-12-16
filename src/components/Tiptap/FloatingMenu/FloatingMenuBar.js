import React from 'react'
import {FloatingMenu} from '@tiptap/react'

export default function FloatingMenuBar({editor}) {
  return (
    <>
        {editor && 
            <FloatingMenu editor={editor}>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                h1 </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                h2 </button>
            </FloatingMenu> 
        }
    </>
  )
}
