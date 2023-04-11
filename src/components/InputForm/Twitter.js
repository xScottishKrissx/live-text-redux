import React,{useRef} from 'react'

export default function Twitter({setTweet, value}) {

    const tweetIdRef =  useRef()
    
    return (
        <div className='author-input-form-insert-tweet'>
            <div className='author-input-field'>
                <div className='defaultBtnStyle'>
                    <span>Tweet Id</span>                    
                    <input ref={tweetIdRef} type="text" onChange={(e)=>setTweet(e.target.value)} value={value}/>
                </div>
            </div>
        </div>
    )
}
