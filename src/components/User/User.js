import React,{useState, useEffect} from 'react'

import { useSelector, dispatch, useDispatch } from 'react-redux'
import { 
    auth, 
    provider,
    // db
    firebaseApp,
    firestore
} from '../../firebase'

import { 
    setDoc, 
    doc, 
    getFirestore,
    getDoc} 
from 'firebase/firestore'

import {
    signInWithPopup, 
    signOut, 
    GoogleAuthProvider, 
    getAdditionalUserInfo
} from '@firebase/auth'

import { updateArray } from '../../features/live-text'
import './user.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getApp } from 'firebase/app'
export default function User() {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const [userInfo, setUserInfo] = useState({id:localStorage.getItem("userId") || "", info:"" , email:localStorage.getItem("userEmail") || ""})
  
    // console.log(db)
    // console.log(auth.currentUser)
    // const [users, setUsers] = useState({email:""}) 
    // const userId = "o8xxHg5bvdQfY5SdHlqS9Q8J1Uj2" || auth.currentUser.uid
    // useEffect(() =>{
    //     const getUsers = async () =>{
    //         // const queryUser = query(collection(db, "users"), where("id", "==" , userId))
    //         const queryUser = query(collection(db, "users"))
    //         const data = await getDocs(queryUser)
            

    //         setUsers( 
    //             data.docs.map((doc) => (
    //                 {
    //                     ...doc.data(), 
    //                     id: doc.id
    //                 } 
    //             ))
    //         )
    //     }
    //     getUsers()
    // },[userId])
    
    // console.log(liveText)
 
    // const handleAddUser = async (id) =>{
    //     await setDoc(doc(db, "users", id), {
    //         info:JSON.stringify(liveText)
    //     })
        
    // }
    // const firebaseApp = getApp()
    // const firestore = getFirestore(firebaseApp)
    // console.log(liveText)
    console.log(userInfo)
    const signInWithGoogle = () =>{
        signInWithPopup(auth, provider)
            .then((result)=>{

                console.log(result.user)
                const currentUserId = result.user.uid
                const currentUserEmail = result.user.email
                
                
                const userQuery = doc(firestore, 'users', currentUserId)
                getDoc(userQuery).then((docSnapshot) => {
                    if(!docSnapshot.exists()){
                        console.log("New Email! Creating New Account")
                        setDoc(doc(firestore, 'users', currentUserId), {email: currentUserEmail, info:{}})
                    }else{
                        console.log("Email Exists, do something else")
                        console.log(docSnapshot.id)
                        // Retrieve Data and set into state
                        console.log(docSnapshot.data())
                        setUserInfo({id:currentUserId, email:currentUserEmail, info:JSON.parse(docSnapshot.data().info)})
                        dispatch(updateArray(JSON.parse(docSnapshot.data().info)))
                        console.log("Columns Loaded")
                    }

                })

                setUserInfo({...userInfo , id:currentUserId, email: currentUserEmail, })
                localStorage.setItem("userEmail", currentUserEmail)
                localStorage.setItem("userId", currentUserId)
            })
            .catch((error) =>{
                console.error(error)
            })
    }
    // const handleAddUser = async (id) =>{
    //     await setDoc(doc(db, "users", id), {
    //         info:JSON.stringify(liveText)
    //     })
        
    // }
    const saveColumns = async () =>{
        console.log("Save")
        console.log(userInfo.id)
        console.log(userInfo.email)
        console.log(JSON.stringify(liveText))
        await setDoc(doc(firestore, 'users', userInfo.id),{
            email:userInfo.email,
            info:JSON.stringify(liveText)
        })

    }

    // const signIn =() =>{
    //  signInWithPopup(auth, provider)
    //   .then((result) =>{
    //     const user = result.user;

    //     // setUserInfo({email: user.email})
    //     // handleAddUser(user.uid) 

    //     localStorage.setItem("userEmail", user.email)
    //     console.log("LoggedIn As: " + user.uid)
    //   })
    // }
  
    const signOutPlease = () =>{
      signOut(auth).then(() =>{})
      localStorage.setItem("userEmail", "")
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
