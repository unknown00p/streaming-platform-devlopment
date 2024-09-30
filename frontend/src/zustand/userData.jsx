import { create } from "zustand";

const userData = create((set) => (
    {
        currentUserData: null,

        setCurrentUserData: (data) => set(() => (
            {
                currentUserData: data
            }
        ))
    }
))      

export default userData