import React,{useState, useEffect} from 'react'

import { useSelector, dispatch, useDispatch } from 'react-redux'
import { 
    auth, 
    provider,
    db
} from '../../firebase'

import { 
    setDoc, 
    doc } 
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
export default function User() {
    // localStorage.clear()
    const dispatch = useDispatch()
    const liveText = useSelector((state) => state.livetext.value)
    const [userInfo, setUserInfo] = useState({email:localStorage.getItem("userEmail") || ""})
  
    // console.log(db)
    // console.log(auth.currentUser)
    const [users, setUsers] = useState([]) 
    const userId = "o8xxHg5bvdQfY5SdHlqS9Q8J1Uj2" || auth.currentUser.uid
    useEffect(() =>{
        const getUsers = async () =>{
            // const queryUser = query(collection(db, "users"), where("id", "==" , userId))
            const queryUser = query(collection(db, "users"))
            const data = await getDocs(queryUser)
            

            setUsers( 
                data.docs.map((doc) => (
                    {
                        ...doc.data(), 
                        id: doc.id
                    } 
                ))
            )
        }
        getUsers()
    },[userId])
    
    console.log(liveText)
 
    const handleAddUser = async (id) =>{
        await setDoc(doc(db, "users", id), {
            info:JSON.stringify(liveText)
        })
        
    }

    const signIn =() =>{
     signInWithPopup(auth, provider)
      .then((result) =>{
        const user = result.user;

        setUserInfo({email: user.email})
        handleAddUser(user.uid) 

        localStorage.setItem("userEmail", user.email)
        console.log("LoggedIn As: " + user.uid)
      })
    }
  
    const signOutPlease = () =>{
      signOut(auth).then(() =>{})
      localStorage.setItem("userEmail", "")
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
            <button className='defaultBtnStyle' onClick={()=>signIn()}>Sign in</button>
        }
       
    </div>
  )
}
