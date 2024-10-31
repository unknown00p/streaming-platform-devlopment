import { create } from 'zustand'


const videoStore = create((set) => (
    {
        searchData: null,

        setSearchData: (data) => set(() => (            
            { searchData: data }
        ))
    }
))

export {videoStore}