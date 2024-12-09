import { useState, useEffect } from 'react'
import SideBar from '../subComponents/SideBar'
import Wrapper from '../components/Wrapper'
import { videoStore } from '../zustand/videoStore'
import { getAllSearchVideos } from '../api/videos/videoApi'
import { userById } from '../api/authentication/authApi'
import { useNavigate } from 'react-router-dom'

function SearchResult() {
    const [searchResult, setSearchResult] = useState(true)
    const [videos, setvideos] = useState(null)
    const searchData = videoStore((state) => state.searchData)
    const navigate = useNavigate()

    useEffect(() => {
        // // console.log(searchData);
        async function getData(params) {
            const response = await getAllSearchVideos({ query: searchData })
            const pendingResponse = response.data.data.videos.map((val) => userById(val?.owner))
            const resolvedResponse = await Promise.all(pendingResponse)
            // // console.log(resolvedResponse);

            const all = response.data.data.videos.map((video, index) => (
                {
                    ...video,
                    userdata: resolvedResponse[index]?.data.data.userData
                }
            ))

            setvideos(all)
        }
        getData()
    }, [searchData])

    function formatTimeDifference(date) {
        const now = new Date();
        const timestamp = new Date(date);
        const diffInSeconds = Math.floor(Math.abs(now - timestamp) / 1000);

        const units = [
            { label: 'year', value: 365 * 24 * 60 * 60 },
            { label: 'month', value: 30 * 24 * 60 * 60 },
            { label: 'week', value: 7 * 24 * 60 * 60 },
            { label: 'day', value: 24 * 60 * 60 },
            { label: 'hour', value: 60 * 60 },
            { label: 'minute', value: 60 },
        ];

        for (const { label, value } of units) {
            const diff = Math.floor(diffInSeconds / value);
            if (diff > 0) {
                return `${diff} ${label}${diff > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    const videoClick = (e, value) => {
        const target = e?.target.id
        if (target !== "profile" && target !== "dot") {
            navigate(`/video/${value?._id}`)
        }
        if (target == "profile") {
            navigate("/userSection")
        }
    }

    // // console.log(videos);

    return searchResult ? (
        <Wrapper>
            <div className='text-white'>
                <div className='left fixed sm:hidden lg:block bottom-0 lg:bottom-auto w-full lg:w-[4rem]'>
                    <SideBar />
                </div>

                <div className='flex flex-col gap-2'>
                    {videos && videos.map((value, index) => (
                        <div key={index} onClick={(e) => videoClick(e, value)} className='grid gap-3 grid-cols-1 sm:grid-cols-3 lg:ml-[6rem]'>
                            <img className='w-full object-contain aspect-video bg-black rounded-md' src={value.thumbnail} alt="" />

                            <div className='flex gap-3 items-start sm:col-span-2 max-w-[100vw] w-full'>
                                <img src="https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-11 h-11 rounded-full sm:hidden block' alt="" />

                                <div>
                                    <div className='flex justify-between items-center'>
                                        <p className='pb-1 xl:text-xl w-full grow'>
                                            {value.title}
                                        </p>
                                    </div>

                                    <div className='text-sm text-[#dfdede] flex flex-col gap-2'>
                                        <div className='flex gap-2 items-center'>
                                            <p>100k views</p>
                                            <img src="dot.svg" alt="" />
                                            <p>{formatTimeDifference(value.createdAt)}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <img id='profile' src={value.userdata.avatar} className='w-9 h-9 rounded-full sm:block hidden object-cover' alt="" />
                                            <p>{value.userdata.fullName}</p>
                                        </div>
                                    </div>

                                    <div className='pt-1 hidden sm:block text-sm'>
                                        {value.description}
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