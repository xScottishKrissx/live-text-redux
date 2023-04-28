    import { doc } from "firebase/firestore"
    import { setDoc } from "firebase/firestore"
    import { firestore } from "../../firebase"


const saveColumns = async (liveText) =>{
    console.log("Save")

    const id = localStorage.getItem("userId")
    const email = localStorage.getItem("userEmail")

    // console.log(id)
    // console.log(email)
    // console.log(liveText)


    if(id){
        await setDoc(doc(firestore, 'users', id),{
            email:email,
            info:JSON.stringify(liveText)
        })
    }
}


export default saveColumns