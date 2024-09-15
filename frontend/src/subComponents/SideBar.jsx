import { Link } from "react-router-dom"

function SideBar() {

    const sidebarVal = [
        {
            "name": "Home",
            "src": "home.svg",
            "link": ""
        },
        {
            "name": "Subscriptions",
            "src": "subscription.svg",
            "link": ""
        },
        {
            "name": "You",
            "src": "currentUser.svg",
            "link": "/desktop"
        },
        {
            "name": "Downloads",
            "src": "download.svg",
            "link": ""
        },
    ]

    return (
        <div className='flex lg:flex-col bg-[#13151a] lg:bg-[#0000] w-full lg:w-[4rem] gap-10 text-white justify-center lg:justify-normal lg:gap-8 p-3 pr-6 lg:p-0'>
            {sidebarVal.map((value) => (
                <Link key={value.name} to={value.link}>
                <div className='flex flex-col items-center'>
                    <button aria-label={value.name} title={value.name} className='flex items-center flex-col hover:opacity-75 focus:opacity-100'>
                        <img src={value.src} alt={value.name} />
                        <p className='text-[0.70rem]'>{value.name}</p>
                    </button>
                </div>
                </Link>
            ))}
        </div>
    )
}

export default SideBar
