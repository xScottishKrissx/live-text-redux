import React,{useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'
// Firebase
import { provider, firestore } from '../../firebase'
import { setDoc, doc, getDoc} from 'firebase/firestore'
import { signInWithPopup, signOut, } from '@firebase/auth'
import { getAuth } from "@firebase/auth";
// Me
import { updateArray } from '../../features/live-text'
import './user.css'
import { setLoggedIn } from '../../features/loggedIn'
import SaveToFirestore from './saveToFirestore'
import saveColumns from './saveToFirestore'

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
    const {id, info, email} = userInfo

    // Update firestore when a change is made to columns and posts
    // useEffect(()=>{
    //     const saveColumnsToFirestore = async () =>{
    //         console.log("Save")
    //         if(id){
    //             await setDoc(doc(firestore, 'users', id),{
    //                 email:email,
    //                 info:JSON.stringify(liveTextMaster)
    //             })
    //         }
    //     }
    //     saveColumnsToFirestore()
    // },[liveTextMaster])

    // const saveColumnsToFirestore = async () =>{
    //     console.log("Save")
    //     if(id){
    //         await setDoc(doc(firestore, 'users', id),{
    //             email:email,
    //             info:JSON.stringify(liveTextMaster)
    //         })
    //     }
    // }
    

    // Sign In With Google
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider)
            .then((result)=>{

                // Same as if else statements
                result ? dispatch(setLoggedIn(true)) : dispatch(setLoggedIn(false));

                const currentUserId = result.user.uid
                const currentUserEmail = result.user.email
                const userQuery = doc(firestore, 'users', currentUserId)

                getDoc(userQuery).then((docSnapshot) => {

                   !docSnapshot.exists() ?
                        // New Account! Creating New Account
                        setDoc(doc(firestore, 'users', currentUserId), {email: currentUserEmail, info:{}})
                    :
                        // Account Exists, retrieve information
                        dispatch(updateArray(JSON.parse(docSnapshot.data().info)))
                        
                        setUserInfo({
                            id:docSnapshot.id, 
                            email:docSnapshot.data().email, 
                            info:JSON.parse(docSnapshot.data().info)
                        })

                        
                    

                    // if(!docSnapshot.exists()){
                    //     // New Account! Creating New Account
                    //     setDoc(doc(firestore, 'users', currentUserId), {email: currentUserEmail, info:{}})
                    // }else{
                    //     // Account Exists, retrieve information
                    //     dispatch(updateArray(JSON.parse(docSnapshot.data().info)))
                        
                    //     setUserInfo({
                    //         id:docSnapshot.id, 
                    //         email:docSnapshot.data().email, 
                    //         info:JSON.parse(docSnapshot.data().info)
                    //     })
                    // }

                })
                localStorage.setItem("userEmail", currentUserEmail)
                localStorage.setItem("userId", currentUserId)
            })            
            .catch((error) =>{
                console.error(error)
            })
    }
    




    const signOutPlease = () =>{
        console.log("Signing Out")

        saveColumns(liveTextMaster)
        signOut(auth)
        dispatch(setLoggedIn(false))
        localStorage.clear()
    }

    

  return (
    <div className='user-container'>
        {loggedInState ? 
            <div className='user-loggedIn'>
                <p>{email}</p> 
                
                <button className='defaultBtnStyle' onClick={()=>signOutPlease()}>Sign Out</button>
            </div>
        : 
            <button className='defaultBtnStyle' onClick={()=>signInWithGoogle()}>Sign in</button>
        }       
    </div>
  )
}
