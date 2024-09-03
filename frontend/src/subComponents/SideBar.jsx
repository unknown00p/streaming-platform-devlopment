function SideBar() {
    return (
        <div className='flex flex-col gap-8 text-white'>
            <div className='flex flex-col items-center'>
                <button aria-label="Home" title="Home" className='flex items-center flex-col hover:opacity-75 focus:opacity-100'>
                    <img src="home.svg" alt="Home" />
                <p className='text-[0.70rem]'>Home</p>
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <button aria-label="Subscriptions" title="Subscriptions" className='flex items-center flex-col hover:opacity-75 focus:opacity-100'>
                    <img className='w-[1.8rem]' src="subscription.svg" alt="Subscriptions" />
                <p className='text-[0.70rem]'>Subscriptions</p>
                </button>
            </div>
           
            <div className='flex flex-col items-center'>
                <button aria-label="You" title="You" className='flex items-center flex-col hover:opacity-75 focus:opacity-100'>
                    <img src="currentUser.svg" alt="You" />
                <p className='text-[0.70rem]'>You</p>
                </button>
            </div>

            <div className='flex flex-col items-center'>
                <button aria-label="Downloads" title="Downloads" className='flex items-center flex-col hover:opacity-75 focus:opacity-100'>
                    <img src="download.svg" alt="Downloads" />
                <p className='text-[0.70rem]'>Downloads</p>
                </button>
            </div>
        </div>
    )
}

export default SideBar
