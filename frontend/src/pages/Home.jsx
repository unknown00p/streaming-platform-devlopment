// import CategoryCarousel from '../subComponents/Category'
import { useEffect, useState } from 'react'
import SideBar from '../subComponents/SideBar'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import { getAllVideos } from '../api/videos/videoApi'
import { userById } from '../api/authentication/authApi'
import CurrentUser from '../api/authentication/CurrentUser'

function Home() {
  const [hasVideo, setHasVideo] = useState(true)
  const [videoArray, setVideoArray] = useState([])

  useEffect(() => {
    async function getAllVideosFunc() {
      const response = await getAllVideos()
      if (response) {
        setHasVideo(true)
        const videoData = response.data.data.allvideos

        const awaitResponse = videoData.map((val) => userById(val?.owner))
        const userDataResponse = await Promise.all(awaitResponse)

        const enrichedVideos = videoData.map((video, index) => (
          {
            ...video,
            userData: userDataResponse[index].data.data.userData,
          }));

        setVideoArray(enrichedVideos)
      } else {
        setHasVideo(false)
      }
    }
    getAllVideosFunc()
  }, [])

  const navigate = useNavigate()
  const videoClick = (e, value) => {
    const target = e?.target.id
    if (target !== "profile" && target !== "dot") {
      navigate(`video/${value?._id}`)
    }
    if (target == "profile") {
      navigate("userSection")
    }
  }

  function formatTimeDifference(date) {
    const now = new Date();
    const timestamp = new Date(date);

    const diffInMs = Math.abs(now - timestamp);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate
    const diffInYears = Math.floor(diffInDays / 365); // Approximate

    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `just now`;
    }
  }

  return hasVideo ? (
    <Wrapper>
      <div className='flex'>

        <div className='left fixed sm:hidden lg:block bottom-0 lg:bottom-auto w-full lg:w-[4rem]'>
          <SideBar />
        </div>

        <div className='right w-full pt-3 overflow-hidden sm:mx-3 pb-16 sm:pb-0'>
          <div className='lg:ml-[6rem] max-w-full ml-0 items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 cursor-pointer'>
            {videoArray && videoArray.map((value) => {          
              return <div key={value._id} className=''>
                <div onClick={(e) => {
                  videoClick(e, value)
                }} className="rounded-xl shadow-lg">
                  <div className=''>
                    <img className="object-cover w-full h-[13rem] rounded-sm" src={value?.thumbnail} alt="Sunset in the mountains" />
                  </div>
                  <div className="py-4">
                    <div className="flex gap-0">
                      <img onClick={() => {
                        console.log("Hola");
                      }} id='profile' className="w-11 h-11 rounded-full mr-4" src={value?.userData?.avatar} alt="Avatar of Jonathan Reinink" />
                      <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                        <div className='flex gap-2'>
                          <div className="text-lg">{value?.title}</div>
                        </div>
                        <p className="leading-none text-[#a1a1a1]">{value?.userData?.username}</p>
                        <div className='flex gap-1 text-[#a1a1a1]'>
                          <p>{value?.views} views.</p>
                          <p>{formatTimeDifference(value?.createdAt)}</p>
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
    </Wrapper>
  ) : <div className='flex h-[57vh] justify-center flex-col text-white items-center'>
    <div className='flex flex-col justify-center items-center w-[18rem] gap-2'>
      <p>
        <img className='bg-[#45434370] p-2 rounded-full' src="/play.svg" alt="" />
      </p>

      <p>No videos available</p>
      <p className='text-sm text-center'>There is no video available here. please try again somtimes</p>
    </div>
  </div>
}

export default Home