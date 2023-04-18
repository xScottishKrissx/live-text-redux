import React from 'react'

export default function ExtraInfo({allowExtraInfoView, postCount}) {
  return (
    <>
        {allowExtraInfoView  ?
            <div className="manageColumns-column dropdown">
                <div className="manageColumns-postAmount">
                    <button className='defaultBtnStyle'> {postCount} {postCount !== 1 ? "Posts" : "Post"}</button>
                </div>

                <div className="manageColumns-postAmount">
                    <button className='defaultBtnStyle'> Created 12/1/2023</button>
                </div>
            </div>

        : null
        }
    </>
  )
}
