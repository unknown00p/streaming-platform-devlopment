import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileVideos() {
    const [hasVideo, setHasVideo] = useState(true)

    const navigate = useNavigate()
    const videoClick = (e) => {
        const target = e?.target.id
        if (target !== "dot") {
            navigate("/video")
        }
    }

    const arr = [
        "https://th.bing.com/th/id/OIP.NZtfot858OjoU8G0Y5TE9AHaEo?w=242&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.wg4R0mAD1_DQAII9hCM-8AHaDk?w=341&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.IHY4jIGoaywV1CkIYxzsNQHaEo?w=299&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.YMuauF2NaoHPNikNQyavFAHaEo?w=279&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.t_kb1S2P60S7gaKnEqQOjQHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.otQVzr8T480Dyttw-acdjgHaEP?w=312&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.BMXp9yc1JYylds7IvkyDrgHaGT?w=261&h=220&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.amEbZWd9JRcIxkyVtYNODwHaE8?w=272&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.hyOp4DHwU808lVPQ7qaZJAHaHa?w=194&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.bPsFZEaqlxRKQ9qrj9O57QHaFl?w=226&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.P_EOEXQab_37lelWDioz9QHaDf?w=330&h=164&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.Yit4ehVET_xvmHYDJvYTpgAAAA?w=267&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        "https://th.bing.com/th/id/OIP.A4dsv6AkIGssWk1TwfS97gHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    ]
    return hasVideo ? (
        <div>
            <div className='right w-full overflow-hidden'>
                <div className='max-w-full ml-0 items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 cursor-pointer'>
                    {arr.map((value, i) => {
                        return <div key={i} className=''>
                            <div onClick={(e) => {
                                videoClick(e)
                            }} className="rounded-xl shadow-lg">
                                <div className=''>
                                    <img className="object-cover w-full h-[13rem] rounded-sm" src={value} alt="Sunset in the mountains" />
                                </div>
                                <div className="py-4">
                                    <div className="flex gap-1">
                                        <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                                            <div className='flex gap-2 items-baseline'>
                                                <div className="text-lg">Learn how to use Tailwind CSS card Learn how to use Tail...</div>
                                                <div>
                                                    <img className='hover:bg-[#162b45] hover:rounded-full w-9' id='dot' src="/dots.svg" alt="" />
                                                </div>
                                            </div>
                                            <p className="leading-none text-[#a1a1a1]">Jonathan Reinink</p>
                                            <div className='flex gap-1 text-[#a1a1a1]'>
                                                <p>173K views.</p>
                                                <p>3 weaks ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    ) : <div className='flex h-[15rem] justify-center flex-col text-white items-center'>
        <div className='flex flex-col justify-center items-center w-[18rem] gap-2'>
            <p>
                <img className='bg-[#45434370] p-2 rounded-full' src="/play.svg" alt="" />
            </p>

            <p>No videos available</p>
            <p className='text-sm text-center'>There is no video available here. please try again somtimes</p>
        </div>
    </div>
}

export default ProfileVideos
