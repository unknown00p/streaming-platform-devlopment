// import fireConfig from "../googleConfig.js"

// const auth = getAuth(fireConfig)
// const provider = new GoogleAuthProvider()

// export const googleLogin = async() => {
//     try{
//         const result = await signInWithPopup(auth,provider)
//         // console.log(result,"result")
//         const user = result.user
//         const idToken = await user.getIdToken();
//         return idToken
//     }catch(error){
//         console.log(error)
//     }
// }