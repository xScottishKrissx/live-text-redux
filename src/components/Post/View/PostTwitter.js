import React from 'react'
import { Tweet } from 'react-twitter-widgets'

export default function PostTwitter({tweet}) {
    if(!tweet) return
    return (
        <>
            <Tweet tweetId={tweet} /> 
        </>
    )
}
