import React,{useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
// Firebase
import { auth, provider, firestore } from '../../firebase'
import { setDoc, doc, getFirestore, getDoc} from 'firebase/firestore'
import { signInWithPopup, signOut, } from '@firebase/auth'
// Me
import { updateArray } from '../../features/live-text'
import './user.css'

export default function User() {

    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)

    const [userInfo, setUserInfo] = useState({
        id:localStorage.getItem("userId") || "", 
        info:liveText , 
        email:localStorage.getItem("userEmail") || ""
    })
  
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider)
            .then((result)=>{

                const currentUserId = result.user.uid
                const currentUserEmail = result.user.email
                const userQuery = doc(firestore, 'users', currentUserId)

                getDoc(userQuery).then((docSnapshot) => {
                    if(!docSnapshot.exists()){
                        // New Account! Creating New Account
                        setDoc(doc(firestore, 'users', currentUserId), {email: currentUserEmail, info:{}})
                    }else{
                        // Account Exists, do something else
                        dispatch(updateArray(JSON.parse(docSnapshot.data().info)))
                        setUserInfo({
                            id:currentUserId, 
                            email:currentUserEmail, 
                            info:JSON.parse(docSnapshot.data().info)
                        })
                        
                    }

                })

                localStorage.setItem("userEmail", currentUserEmail)
                localStorage.setItem("userId", currentUserId)
            })
            
            .catch((error) =>{
                console.error(error)
            })
        }

    const saveColumns = async () =>{
        console.log("Save")
        console.log(JSON.stringify(liveText))
        await setDoc(doc(firestore, 'users', userInfo.id),{
            email:userInfo.email,
            info:JSON.stringify(liveText)
        })
    }

    const signOutPlease = () =>{
      signOut(auth).then(() =>{})
      localStorage.clear()
      window.location.reload()
    }

    

  return (
    <div className='user-container'>
        {userInfo.email ? 
            <div className='user-loggedIn'>
                <p>{userInfo.email}</p> 
                
                <button className='defaultBtnStyle' onClick={()=>signOutPlease()}>Sign Out</button>
            </div>
        : 
            <button className='defaultBtnStyle' onClick={()=>signInWithGoogle()}>Sign in</button>
        }

        <button className='defaultBtnStyle' onClick={saveColumns}>Save Columns</button>
       
    </div>
  )
}
