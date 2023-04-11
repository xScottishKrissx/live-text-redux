import React,{useRef} from 'react'

export default function Youtube({value, setYoutube}) {
    const youtubeUrlRef =  useRef()

    return (
        <div className='author-input-form-insert-youtube'>
            <div className='author-input-field'>
                <div className='defaultBtnStyle'>
                    <span>Youtube Video Url </span>
                    <input 
                        ref={youtubeUrlRef} 
                        type="text" 
                        onChange={(e)=>setYoutube(e.target.value)} 
                        value={value} 
                    />
                </div>
            </div>
        </div>
    )
}
