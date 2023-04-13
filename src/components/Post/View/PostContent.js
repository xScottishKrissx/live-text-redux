import React from 'react'
import DOMPurify from 'dompurify'
// Logged in - A prop for now but should be read from state in the future when login system in place
import { cleanInput } from '../../Utility/cleanInput'
export default function PostContent({title, subtitle, body, image, hidden}) {

    const createMarkup = (html) =>{ return{ __html:DOMPurify.sanitize(html) } }

    return (
        <div className='post-item-body'>
 
            {hidden === true ? <strong>Hidden</strong> : null }

            <div className='post-item-headline-wrapper'>

                {/* { headlineIcon ? <img src={"https://via.placeholder.com/50x50"} /> : ""}  */}
                
                <div className='post-item-headline-content '>
                    <div className='post-item-title'>                            
                         {title ? <div>{cleanInput(title)}</div> : null }
                    </div>

                    {subtitle ? <div className='post-item-subtitle'>{cleanInput(subtitle)}</div> : null }
                </div>

            </div>

            {image ? 
                <img src={require("../../../Assets/" + image)} /> 
            : null}

            {/* I need to use this instead of the above because I need to preserve the spacing and i can't figure out how to keep the p tags while stripping everything else. */}
            {body ? <div dangerouslySetInnerHTML={createMarkup(body.replace('@', ''))}></div> : null}
         

        </div>
    )
}
