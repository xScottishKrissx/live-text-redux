import { doc } from "firebase/firestore"
import { setDoc } from "firebase/firestore"
import { firestore } from "../../firebase"


const saveToFireStore = async (liveText) =>{
    console.log("Save")

    const id = localStorage.getItem("userId")
    const email = localStorage.getItem("userEmail")

    if(id){
        await setDoc(doc(firestore, 'users', id),{
            email:email,
            info:JSON.stringify(liveText)
        })
    }
}


export default saveToFireStore