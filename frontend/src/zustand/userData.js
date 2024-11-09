import { create } from "zustand";

const userData = create((set) => (
    {
        currentUserData: null,
        isUser: false,

        setCurrentUserData: (data) => set(() => (
            {
                currentUserData: data
            }
        )),

        setIsUser: ()=> set(()=>(
            {
                isUser: true
            }
        ))
    }
))

export default userData