import { create } from "zustand"

const useCounterStore = create((set) => ({
    toggelBarCss: "left-[-20rem]",
    coverAll: "",
    toggleSideBar: () => set((state) => {
        const newToggelBarCss = state.toggelBarCss === "left-[-20rem]" ? "left-[0]" : "left-[-20rem]";
        return {
            toggelBarCss: newToggelBarCss,
            coverAll: newToggelBarCss === "left-[0]" ? "!bg-[#2c2c2c3f] h-screen top-[-73px] relative" : ""
        };
    }),
    handleClickOutside: (e) =>
        set(() => {
            const newToggelBarCss = !e?.target.closest("#logo-sidebar") && !e?.target.closest("#mainMenu") || e?.target.closest(".slideLeft")? "left-[-20rem]": "left-[0]";
            return{
                toggelBarCss: newToggelBarCss,
                coverAll: newToggelBarCss === "left-[0]" ? "!bg-[#2c2c2c3f] h-screen top-[-73px] relative" : ""
            }
        })
}))

export default useCounterStore
