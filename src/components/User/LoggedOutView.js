import React from 'react'
export default function LoggedOutView({signInWithGoogle}) {

  return (
    <div className='loggedOutViewWrapper'>
        <div className="leftDiv">
            <h1>Live Text CMS Thing</h1>
            <div>
                <h2>Purpose:</h2>
                <ul>
                    <li>Learn React Redux</li>
                    <li>Create a functional CMS</li>
                    <li>Learn how to auth with Google</li>
                    <li>Practice with Firestore</li>
                    <li>Achieve similiar functionality you see in a BBC Live text</li>
                </ul>
            </div>
        </div>

        <div className="rightDiv">
            <button className='defaultBtnStyle' onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    </div>
  )
}
