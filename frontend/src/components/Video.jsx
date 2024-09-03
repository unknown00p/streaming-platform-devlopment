import CustomVideoPlayer from "../subComponents/CustomVideoPlayer"
import { useState } from "react"
function Video() {
  const [imageUrl, setImageUrl] = useState([
    "https://th.bing.com/th/id/OIP.c2yh-vjm-Ze872ygDBhg3QHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.hF8_3tDhRrZvxm-j1kZwgwHaE9?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  ])


  const qualityArr = [
    "https://res.cloudinary.com/dlgstatc7/video/upload/sp_auto/v1725275908/jtwtanvvspkj4rpsszdv.m3u8",
    "https://res.cloudinary.com/dlgstatc7/video/upload/br_3000k,c_limit,h_1080,vc_h265,w_1920/sp_full_hd/v1725275908/jtwtanvvspkj4rpsszdv.m3u8",
    "https://res.cloudinary.com/dlgstatc7/video/upload/br_1500k,c_limit,h_720,vc_h264,w_1280/sp_hd/v1725275908/jtwtanvvspkj4rpsszdv.m3u8",
    "https://res.cloudinary.com/dlgstatc7/video/upload/br_800k,c_limit,h_480,vc_h264,w_854/sp_sd/v1725275908/jtwtanvvspkj4rpsszdv.m3u8"
  ]

  const videoUrls = ["Idea 10.mp4", "videoplayback.mp4", "6-second-timer.mp4"]
  return (
    <main className="flex gap-4 justify-around px-6">
      <div className="left">
        <div>
          <CustomVideoPlayer videoUrl={videoUrls} qualityArr={qualityArr} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {imageUrl && imageUrl.map((url) => (<div key={url} className="right">
          <div className="flex gap-3 rounded-md">
            <div className="">
              <img className="w-[9rem] rounded-md" src={url} alt="" srcSet="" />
            </div>

            <div className="text-white">
              <p className="w-72 text-[1.1rem]">Lorem ipsum dolor sit amet consec</p>
              <p className="text-[0.9rem] text-[#9a9a9a]">Bot alam</p>
              <div className="flex text-[0.9rem] text-[#9a9a9a]">
                <p>35M views</p>
                <p>1 day ago</p>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    </main>
  )
}

export default Video
