import { create } from "zustand";

const useAuth = create((set)=> (
    {
        isAuth: false,
        authData: null,

        setAuth: (data) => set(()=> (
            {
                isAuth: true,
                authData: data
            }
        ))
    }
))

export default useAuth