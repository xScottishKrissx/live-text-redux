import React from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
// Logged in - A prop for now but should be read from state in the future when login system in place

export default function PostContent({loggedIn, handleEdit, editMode, id,title, subtitle, body, image}) {

    const editModeState = useSelector((state) => state.edit.value)
    const createMarkup = (html) =>{ return{ __html:DOMPurify.sanitize(html) } }
    
    const toggleEditButton = editModeState.editing === false && editModeState.editId !== id

    return (
        <div className='post-item-body'>
            {loggedIn ? 
                <>
                    {toggleEditButton ? <button onClick={()=>handleEdit(!editMode, id)}>Edit Me</button> : null }
                </>
            : null }

            <div className='post-item-headline-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}
                
                <div className='post-item-headline-content '>
                    <div className='post-item-title'>                            
                        {title ? 
                            <div dangerouslySetInnerHTML={createMarkup(title.replace('@', ''))}></div> 
                        : null }
                    </div>

                    {subtitle ? 
                        <div className='post-item-subtitle' dangerouslySetInnerHTML={createMarkup(subtitle.replace('@', ''))}></div> 
                    : null }
                </div>

            </div>

            {image ? 
                <img src={require("../../../Assets/" + image)} /> 
            : null}

            {body ? 
                <div dangerouslySetInnerHTML={createMarkup(body.replace('@', ''))}></div> 
            : null}

        </div>
    )
}
