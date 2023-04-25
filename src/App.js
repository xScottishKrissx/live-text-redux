import './App.css';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import AuthorInput from './components/author-input';
import ItemReview from './components/ItemReview/item-review';

import "../src/components/Utility/Buttons/buttons.css"
import Columns from './components/Column/Column';
import { auth, provider } from './firebase';
import {signInWithPopup, signOut, GoogleAuthProvider, getAdditionalUserInfo} from '@firebase/auth'




function App() {
  // localStorage.clear()
  const editModeState = useSelector((state) => state.edit.value)
  const newItem = useSelector((state) => state.items.value)
  const previewItem = useSelector((state) => state.preview.value)

  const [userInfo, setUserInfo] = useState({email:localStorage.getItem("userEmail") || ""})
console.log(auth.currentUser)
  const signIn =() =>{
   signInWithPopup(auth, provider)
    .then((result) =>{
      console.log(result)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
     setUserInfo({email: user.email})
     localStorage.setItem("userEmail", user.email)
    }).catch((error) =>{
          // Handle Errors here.

    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }

  const signOutPlease = () =>{
    signOut(auth).then(() =>{})
  }

  return (
    <div className="App">
        {/* <h1>Email: {auth.currentUser.email}</h1> */}
        {userInfo.email ? 
           <h1>Email: {userInfo.email}</h1> 
          : 
          "Not Signed In"
          }
        <button onClick={()=>signIn()}>Sign in</button>
        <button onClick={()=>signOutPlease()}>Sign Out</button>
      <div className="main-wrapper">
        <AuthorInput />

        

        <div className='right-column'>
          {editModeState.editing ? <ItemReview data={previewItem} /> : <ItemReview data={newItem} /> }
          <Columns />
        </div>

      </div>
    </div>
  );
}

export default App;
