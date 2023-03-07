import React,{useRef} from 'react'


export default function Twitter({setTweet, value}) {

    const tweetIdRef =  useRef()
    
    return (
        <div className='author-input-form-insert-tweet'>
            <div className='author-input-field'>
                <h3>Tweet Id (optional) </h3>
                <div>
                    <input ref={tweetIdRef} type="text" onChange={(e)=>setTweet(e.target.value)} value={value}/>
                </div>
            </div>
        </div>
    )
}
