import CustomVideoPlayer from "../subComponents/CustomVideoPlayer"
import { useEffect, useState } from "react"
import SideBar from "../subComponents/SideBar"
import Wrapper from "./Wrapper"
import { useParams } from "react-router-dom"
import { getVideobyId } from "../api/videos/videoApi"

function Video() {
  const [saveToPlaylist, setSaveToPlaylist] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const { videoId } = useParams()

  useEffect(() => {

    async function videoByIdFunc() {
      const response = await getVideobyId(videoId)
      console.log('response',response);      
      setVideoData(response.data.data.video)
    }
    videoByIdFunc()

  }, [])

  const imageUrl = [
    "https://th.bing.com/th/id/OIP.c2yh-vjm-Ze872ygDBhg3QHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.hF8_3tDhRrZvxm-j1kZwgwHaE9?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  ]

  const qualityArr = [
    'https://s3.tebi.io/hls-bucket/Aarambh Hai Prachand •X• Polozehni - Shrylox 🔥.mp4/Aarambh Hai Prachand •X• Polozehni - Shrylox 🔥.mp4_master.m3u8',
    'https://s3.tebi.io/hls-bucket/Toast  - One Minute Comedy Film _ Award Winning.mp4/Toast  - One Minute Comedy Film _ Award Winning.mp4_master.m3u8'
  ]

  return (
    <Wrapper>
      <main className="grid lg:grid-cols-[60%_40%] relative grid-cols-1 gap-4 px-2 min-h-screen pb-24 sm:pb-0">

        <div className="sm:hidden static">
          <div className='left-0 fixed sm:hidden z-40 bottom-0 lg:bottom-auto w-full lg:w-[4rem]'>
            <SideBar />
          </div>
        </div>


        <div className="left flex relative flex-col">
          <div className="mb-4">
            
            {videoData ? <CustomVideoPlayer qualityArr={videoData?.videoUrl} />: <div className="w-full aspect-video bg-[#1b1e28] rounded-md"></div>}
          </div>

          <div className="flex flex-col text-white gap-4">
            <div className="flex items-start justify-between gap-2">
              <p>
                Lorem ipsum dolor sit amet Lorem, ipsum. Lor ipsum dolor sit. Lorem, ipsum dolor
              </p>
              <img onClick={() => setSaveToPlaylist(true)} src="/dots.svg" className="w-6 cursor-pointer" alt="" />
            </div>


            <div className="flex gap-3 items-center flex-wrap">

              <div className="flex justify-between gap-3 items-center">
                <div className="flex items-center gap-1">
                  <img onClick={() => {
                    console.log("Hola");
                  }} id='profile' className="w-9 h-9 rounded-full mr-2" src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?w=328&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Avatar of Jonathan Reinink" />
                  <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                    <div className='flex flex-col'>
                      <div className="text-lg">Raj chaurasia</div>
                      <div className="text-sm">280k subscribers</div>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="button" className="text-[#000000] bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none">Subscribe</button>
                </div>
              </div>


              <div className="flex gap-5 items-center justify-between border-2 py-[0.300rem] px-2 rounded-md">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                  1M
                </p>

                <div className="bg-white h-[1.3rem] w-[0.10rem] relative -z-10"></div>

                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>
                </p>
              </div>

            </div>
          </div>


          <div className="comment">
            <div className="w-full bg-[#13151a] text-white rounded-lg my-4">
              <form>
                <h3 className="font-bold mt-10">Comments</h3>

                <div className="w-full my-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-12 py-2 px-3 font-medium text-black placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="Type Your Comment"
                    required
                  ></textarea>
                </div>
                <div className="w-full flex justify-end px-3">
                  <input
                    type="submit"
                    className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                    value="Post Comment"
                  />
                </div>
                <div className="flex flex-col">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="rounded-md p-3 ml-3">
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://avatars.githubusercontent.com/u/22263436?v=4"
                          className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                          alt="User avatar"
                        />
                        <h3 className="font-bold">User name</h3>
                      </div>
                      <p className="text-gray-400 mt-2">this is sample comment</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="flex items-center text-gray-500 hover:text-blue-500"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your like functionality here
                          }}
                        >
                          <span className="ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                          </span>
                          134
                        </button>
                        <button
                          className="flex items-center text-gray-500 hover:text-blue-500"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add your like functionality here
                          }}
                        >
                          <span className="ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button className="bg-[#242222a9] py-1 lg:hidden">Show more</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="right flex flex-col flex-grow gap-4">
          {imageUrl.map((url, index) => (
            <div key={index} className="flex gap-3 rounded-md bg-[#13151a]">
              <div className="flex-shrink-0">
                <img className="rounded-sm w-32 h-24 object-cover" src={url} alt="" />
              </div>
              <div className="text-white flex-grow">
                <p className="text-sm lg:text-base">Lorem ipsum dolor sit amet consec</p>
                <p className="text-xs lg:text-sm text-[#9a9a9a]">Bot alam</p>
                <div className="flex text-xs lg:text-sm text-[#9a9a9a] space-x-2">
                  <p>35M views</p>
                  <p>1 day ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {saveToPlaylist && <div className={`fixed inset-0 z-50 bg-[#2b2b2b87] flex justify-center items-center`}>
          <div>
            <div className='flex justify-center text-white'>
              <div className='bg-[#151826] rounded-sm gap-3 p-10 flex flex-col justify-center'>
                <div className='flex items-center justify-between'>
                  <p>Save to playlist</p>
                  <img onClick={() => setSaveToPlaylist(false)} className="cursor-pointer" src="x.svg" alt="" />
                </div>

                <div className='flex flex-col gap-2'>
                  {Array.from([1, 2, 3, 4]).map((value) => (
                    <div className='flex items-center gap-3' key={value}>
                      <input type="checkbox" id={1} />
                      <p>name of playlist</p>
                    </div>
                  ))}
                </div>

                <div>
                  <div>name</div>
                  <input type="text" className='w-56 h-8 rounded-md px-2 text-black' placeholder='enter playlist name' />
                </div>

                <div>
                  <button className='bg-[#24094b] text-[#fff] rounded-md text-md px-2 py-1'>create new playlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </main>
    </Wrapper>
  )
}

export default Video