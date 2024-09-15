import { useState } from 'react'
import SideBar from '../subComponents/SideBar'
import Wrapper from '../components/Wrapper'

function SearchResult() {
    const [searchResult, setSearchResult] = useState(true)
    const imageUrl = [
        "https://th.bing.com/th/id/OIP.c2yh-vjm-Ze872ygDBhg3QHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.hF8_3tDhRrZvxm-j1kZwgwHaE9?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.TaD-Sw3TdIco5YCJOtJPggHaJ4?w=140&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t_kb1S2P60S7gaKnEqQOjQHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.77J08bFK_F7zzSmGyOQnkgHaDU?w=295&h=156&c=7&r=0&o=5&dpr=1.5&pid=1.7"
    ]
    return searchResult ? (
        <Wrapper>
            <div className='text-white'>
                <div className='left fixed sm:hidden lg:block bottom-0 lg:bottom-auto w-full lg:w-[4rem]'>
                    <SideBar />
                </div>

                <div className='flex flex-col gap-2'>
                    {imageUrl && imageUrl.map((value) => (
                        <div key={value} className='grid gap-3 grid-cols-1 sm:grid-cols-2 lg:ml-[6rem]'>
                            <img className='w-full h-full object-cover rounded-md' src={value} alt="" />

                            <div className='flex gap-3 items-start'>
                                <img src="https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-11 h-11 rounded-full sm:hidden block' alt="" />

                                <div>
                                    <p className='pb-1 xl:text-3xl'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.?
                                    </p>

                                    <div className='text-sm text-[#dfdede] flex flex-col gap-2'>
                                        <div className='flex gap-2 items-center'>
                                            <p>100k views</p>
                                            <img src="dot.svg" alt="" />
                                            <p>18 hours ago</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <img src="https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-11 h-11 rounded-full sm:block hidden' alt="" />
                                            <p>Raj alam</p>
                                        </div>
                                    </div>

                                    <div className='pt-1 hidden sm:block text-sm'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur.
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    ) : <div className='flex h-[57vh] justify-center flex-col text-white items-center'>
        <div className='flex flex-col justify-center items-center w-[18rem] gap-2'>
            <p>
                <img className='bg-[#45434370] p-2 rounded-full' src="play.svg" alt="" />
            </p>

            <p>No videos available</p>
            <p className='text-sm text-center'>There is no video available here. please try to search somthing else</p>
        </div>
    </div>
}

export default SearchResult
7