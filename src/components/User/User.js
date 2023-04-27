import React,{useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
// Firebase
import { provider, firestore } from '../../firebase'
import { setDoc, doc, getFirestore, getDoc, addDoc} from 'firebase/firestore'
import { signInWithPopup, signOut, } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from "@firebase/auth";
// Me
import { updateArray } from '../../features/live-text'
import './user.css'
import { setLoggedIn } from '../../features/loggedIn'

export default function User() {

    const dispatch = useDispatch()
    const auth = getAuth()

    const liveTextMaster = useSelector((state) => state.livetext.value)
    const loggedInState = useSelector((state) => state.loggedIn.value)

    const [userInfo, setUserInfo] = useState({
        id:localStorage.getItem("userId") || "", 
        info:liveTextMaster , 
        email:localStorage.getItem("userEmail") || ""
    })

    onAuthStateChanged(auth, (user) =>{
        if(user){
            // console.log("User Logged In")
            dispatch(setLoggedIn(true))
        }else{
            // console.log("User Not Logged In")
            dispatch(setLoggedIn(false))
        }
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
                        // dispatch(setLoggedIn(true))
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
        // console.log("Save")
        // console.log(JSON.stringify(liveTextMaster))
        // console.log(userInfo.id)
        await setDoc(doc(firestore, 'users', userInfo.id),{
            email:userInfo.email,
            info:JSON.stringify(liveTextMaster)
        })
    }

    useEffect(()=>{
        if(loggedInState === true) saveColumns()
    },[liveTextMaster])

    const signOutPlease = () =>{
      console.log("Signing Out")
      signOut(auth)
      dispatch(setLoggedIn(false))
      setUserInfo({ id:"",  email:"", info:"" })
      localStorage.clear()
    //   window.location.reload()
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
    </div>
  )
}
