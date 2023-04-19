import React from 'react'
import { formatTimestamp } from '../../../../Utility/formatTimestamp'

export default function ExtraInfo({allowExtraInfoView, postCount, createdOn}) {
  return (
    <>
        {allowExtraInfoView  ?
            <div className="manageColumns-column dropdown">
                <div className="manageColumns-postAmount">
                    <button className='defaultBtnStyle'> {postCount} {postCount !== 1 ? "Posts" : "Post"}</button>
                </div>

                <div className="manageColumns-postAmount">
                    <button className='defaultBtnStyle'> {formatTimestamp(createdOn)}</button>
                </div>
            </div>

        : null
        }
    </>
  )
}
