import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import fireConfig from "../firebaseConfig.js"

const auth = getAuth(fireConfig)
const provider = new GoogleAuthProvider()

export const googleLogin = async() => {
    try{
        const result = await signInWithPopup(auth,provider)
        const user = result.user
        const idToken = await user.getIdToken();
        return idToken
    }catch(error){
        console.log(error)
    }
}