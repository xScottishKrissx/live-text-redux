import React,{useRef} from 'react'

export default function Youtube({value, setYoutube}) {
    const youtubeUrlRef =  useRef()

    return (
        <div className='author-input-form-insert-youtube'>
            <div className='author-input-field'>
                <h3>Youtube Video Url (optional) </h3>
                <div>
                    <input ref={youtubeUrlRef} type="text" onChange={(e)=>setYoutube(e.target.value)} value={value} />
                </div>
            </div>
        </div>
    )
}
