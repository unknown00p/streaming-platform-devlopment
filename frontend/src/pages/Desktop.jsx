import SideBar from '../subComponents/SideBar'
import Wrapper from '../components/Wrapper'
import { Link, NavLink,Outlet } from 'react-router-dom'


function Desktop() {

    const deskCategories = [
        {
            "id": 0,
            "name": "Videos",
            "content": <div>Videos</div>,
            "url": "videos"
        },
        {
            "id": 1,
            "name": "Playlist",
            "content": <div>Playlist</div>,
            "url": "playlist"
        },
        {
            "id": 2,
            "name": "Tweets",
            "content": <div>Tweets</div>,
            "url": "tweets"
        },
        {
            "id": 3,
            "name": "Following",
            "content": <div>Following</div>,
            "url": "following"
        },
    ]
    
    return (
        <div className=''>

            <div>
                <div className='left sm:top-20 fixed sm:hidden z-40 sm:z-0 lg:block bottom-[-3px] lg:bottom-auto w-full lg:w-[4rem] pl-2'>
                    <SideBar />
                </div>
            </div>

            <div className='lg:ml-[5rem]'>

                <div className='coverImage relative'>
                    <img className='w-full h-[14rem]' src="https://ts4.mm.bing.net/th?id=OIP.48MZ3Hs-Q9SB5K0M2AdEkgHaEo&pid=15.1" alt="" />
                </div>

                <div className='px-4'>
                    <div className='flex justify-between gap-3 flex-col sm:flex-row w-full pr-3  sm:pt-3'>
                        <div className='flex gap-3 flex-col sm:flex-row'>
                            <div>
                                <img src="https://th.bing.com/th/id/OIP.qdbk6n_P2BUn46mbigDdXgHaLH?w=119&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-24 h-24 rounded-full object-cover relative top-[-3rem] sm:top-[-2rem]' alt="" />
                            </div>

                            <div className='text-white flex flex-col gap-1 top-[-3rem] relative sm:static pl-2 sm:pl-0'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-2xl font-bold'>Raj Bot</p>

                                    <Link to={"/"}>
                                        <div className='text-white gap-2 flex sm:hidden'>
                                            <img src="leftArrow.svg" alt="" />
                                            <p>
                                                back
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                <p className='text-[#c1bfbf]'>@RajAlam</p>
                                <div className='flex gap-1 items-center text-[#b8b8b8] text-sm'>
                                    <p>600k Subscribers</p>
                                    <img src="dot.svg" alt="" />
                                    <p>120 Subscribed</p>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="button" className="text-[#c6c1c1] bg-[#661fbd] font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none top-[-3rem] relative sm:static pl-2">Subscribe</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex justify-center'>
                <div className='flex justify-between text-white border-b-2 w-[90%] gap-1'>
                    {deskCategories && deskCategories.map((value) => (
                        <div key={value.id} className=''>
                            <NavLink 
                            to={value.url} 
                            className={({isActive})=> isActive? "bg-white text-black": ""}
                            >
                                {value.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
                <div>
                    <Outlet/>
                </div>

        </div>
    )
}

export default Desktop
