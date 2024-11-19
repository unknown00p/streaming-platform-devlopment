import { create } from 'zustand'

const videoStore = create((set) => (
    {
        searchData: null,
        progress: 0,

        setSearchData: (data) => set(() => (
            { searchData: data }
        )),

        setProgress: (data) => set(() => (
            { progress: data }
        ))
    }
))

export { videoStore }