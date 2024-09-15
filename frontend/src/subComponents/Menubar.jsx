import { useState, useEffect } from "react"

function Menubar() {
    const [toggleBarCss, setToggleBarCss] = useState("left-[-20rem]")

    function toggleSideBar() {
        toggleBarCss == "left-[-20rem]" ? setToggleBarCss("left-[0]") : setToggleBarCss("left-[-20rem]")
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest("#logo-sidebar") && !e.target.closest("#mainMenu")) {
                setToggleBarCss("left-[-20rem]");
            }

            if (e.target.closest(".slideLeft")) {
                setToggleBarCss("left-[-20rem]");
            }

        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div>
            <button className='hidden sm:block' id='mainMenu' onClick={toggleSideBar}>
                <img src="menubar.svg" alt="" />
            </button>
        </div>
    )
}

export default Menubar
