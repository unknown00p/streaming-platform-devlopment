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
      <div className="flex flex-col lg:flex-row">
        <div className="sm:left-[8px] sm:top-20 fixed sm:hidden z-40 sm:z-0 lg:block bottom-[0px] lg:bottom-auto w-full lg:w-[5rem]">
          <SideBar />
        </div>
        
        <div className="lg:ml-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            <div className="w-full">
              <div className="rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    className="w-full h-48 sm:h-64 object-cover" 
                    src="https://th.bing.com/th/id/OIP.YMuauF2NaoHPNikNQyavFAHaEo?w=279&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" 
                    alt="Playlist cover" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.5px] border border-white/30 text-white p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">Playlist</p>
                        <p className="text-sm">173K views • 3 weeks ago</p>
                      </div>
                      <div className="text-sm font-semibold">22 Videos</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#00000000] text-white">
                  <h2 className="text-xl font-bold mb-2">Learn how to use Tailwind CSS card</h2>
                  <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quam perferendis quisquam. Dicta recusandae reiciendis in.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {imageUrl.map((value, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 bg-[#bbbbbb17] text-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full sm:w-40 h-48 sm:h-auto object-cover" src={value} alt={`Video thumbnail ${i + 1}`} />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit?</h3>
                      <div className="text-sm flex items-center space-x-2">
                        <span>100k views</span>
                        <span>•</span>
                        <span>18 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default PlaylistVideos