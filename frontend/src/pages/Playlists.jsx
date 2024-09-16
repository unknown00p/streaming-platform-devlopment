import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Playlists() {
  const [hasVideo, setHasVideo] = useState(true)

  const navigate = useNavigate()
  const videoClick = () => {
    // const target = e?.target.id
    // if (target !== "dot") {
      navigate("/PlaylistVideos")
    // }
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
        <div className='max-w-full ml-0 items-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 cursor-pointer'>
          {arr.map((value, i) => {
            return <div key={i} className=''>
              <div onClick={(e) => {
                videoClick(e)
              }} className="rounded-xl shadow-lg">
                <div className='relative'>
                  <img className="object-cover w-full h-[13rem] rounded-sm" src={value} alt="Sunset in the mountains" />
                  <div className='absolute bottom-0 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.5px] border border-white/30 w-full p-5'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p>Playlist</p>
                        <div className='flex gap-1 text-[#ffffff]'>
                          <p>173K views.</p>
                          <p>3 weaks ago</p>
                        </div>
                      </div>

                      <div>22 Videos</div>
                    </div>
                  </div>
                </div>


                <div className="py-4">
                  <div className="flex gap-1">
                    <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                      <div className='flex gap-2 items-baseline'>
                        <div className="text-2xl font-bold">Learn how to use Tailwind CSS card Learn how to use Tail...</div>
                      </div>
                      <p className="leading-none text-[#e5e4e4]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quam perferendis quisquam. Dicta recusandae reiciendis in.</p>
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

export default Playlists
