import React from 'react'

export default function PostYoutube({youtube}) {
    if(!youtube) return

    return (
        <div className='post-item-youtube-video'>
            <iframe 
                // width="560" 
                height="315" 
                src={"https://www.youtube.com/embed/" +  youtube}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
            </iframe>
        </div>
    )
}
