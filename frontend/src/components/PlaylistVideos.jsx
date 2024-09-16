import React from 'react'
import Wrapper from './Wrapper'
import SideBar from '../subComponents/SideBar'

function PlaylistVideos() {
  const imageUrl = [
    "https://th.bing.com/th/id/OIP.c2yh-vjm-Ze872ygDBhg3QHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.hF8_3tDhRrZvxm-j1kZwgwHaE9?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  ]
  return (
    <Wrapper>
      <div>

        <div>
          <div className='sm:left-[8px] sm:top-20 fixed sm:hidden z-40 sm:z-0 lg:block bottom-[0px] lg:bottom-auto w-full lg:w-[5rem]'>
            <SideBar />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:ml-[6rem] gap-4'>
          <div className='right w-full overflow-hidden'>
            <div className='max-w-full ml-0 items-center grid cursor-pointer'>
              <div className=''>
                <div className="rounded-xl shadow-lg">
                  <div className='relative'>
                    <img className="object-cover w-full h-[13rem] rounded-sm" src="https://th.bing.com/th/id/OIP.YMuauF2NaoHPNikNQyavFAHaEo?w=279&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Sunset in the mountains" />
                    <div className='absolute bottom-0 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.5px] border border-white/30 w-full p-5'>
                      <div className='flex justify-between text-white items-center'>
                        <div>
                          <p>Playlist</p>
                          <div className='flex gap-1'>
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
                          <div className="text-2xl font-bold">Learn how to use Tailwind CSS card Learn how to...</div>
                        </div>
                        <p className="leading-none text-[#e5e4e4] font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quam perferendis quisquam. Dicta recusandae reiciendis in.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {imageUrl && imageUrl.map((value,i) => (
              <div key={i} className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
                <img className='w-full h-full object-cover rounded-md' src={value} alt="" />

                <div className='flex gap-4 items-start'>
                  <div>
                    <p className='pb-1 xl:text-3xl text-white'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.?
                    </p>

                    <div className='text-sm text-[#dfdede] flex flex-col gap-2'>
                      <div className='flex gap-2 items-center'>
                        <p>100k views</p>
                        <img src="dot.svg" alt="" />
                        <p>18 hours ago</p>
                      </div>
                      {/* <div className='flex items-center gap-2'>
                        <img src="https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className='w-11 h-11 rounded-full sm:block hidden' alt="" />
                        <p>Raj alam</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>
    </Wrapper>
  )
}

export default PlaylistVideos
