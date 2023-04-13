import React from 'react'
import { createMarkup } from '../../Utility/createMarkup'
import { cleanInput } from '../../Utility/cleanInput'

export default function PostContent({title, subtitle, body, image, hidden}) {
    return (
        <div className='post-item-body'>
 
            {hidden === true ? <strong>Hidden</strong> : null }

            <div className='post-item-headline-wrapper'>

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
