import CustomVideoPlayer from "../subComponents/CustomVideoPlayer"
import { useEffect, useState } from "react"
import SideBar from "../subComponents/SideBar"
import Wrapper from "./Wrapper"
import { useParams } from "react-router-dom"
import { getVideobyId } from "../api/videos/videoApi"
import { userById } from "../api/authentication/authApi"
import { toggleVideoLike, getVideoLikes, toggleCommentLike, getCommentLikes } from "../api/like/likeApi"
import userDataStore from "../zustand/userData"
import { makeComment, getVideoComments } from "../api/comment/comment"
import formatTimeDifference from "../hooks/formateTime"
import { toggleSubscription, isChannelSubscribed, getSubscribersOfchannel } from "../api/subscription/subscription"

function Video() {
  const [saveToPlaylist, setSaveToPlaylist] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const [userData, setUserData] = useState(null)
  const { videoId } = useParams()
  const [likesData, setLikesData] = useState(null)
  const currentUserData = userDataStore((state) => state.currentUserData)
  const [commentInputData, setCommentInputData] = useState('')
  const [comments, setComments] = useState([])
  const [commentLikes, setCommentLikes] = useState({})
  const [commentLikesData, setCommentLikesData] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(0)

  useEffect(() => {
    const userId = currentUserData?._id
    async function videoByIdFunc() {
      const res = await getVideoLikes(videoId, userId)
      setLikesData(res.data.data)
      const response = await getVideobyId(videoId)
      if (response) {
        isChannelSubscribed(response.data.data.video?.owner).then((value) => {
          if (value?.data.data.isSubscribed.length > 0) {
            setSubscribed(true)
          } else {
            setSubscribed(false)
          }
        })
        const res = await getSubscribersOfchannel(response.data.data.video?.owner)
        setSubscriberCount(res?.data.data.Subscribers)

        const response2 = await userById(response.data.data.video.owner)
        setUserData(response2.data.data.userData)
      }
      setVideoData(response.data.data.video)
    }
    videoByIdFunc()

  }, [currentUserData])

  async function toggleLikes() {
    const res = await toggleVideoLike(videoId)

    if (res) {
      const userId = currentUserData?._id
      // console.log('userId',userId);
      const response = await getVideoLikes(videoId, userId)
      setLikesData(response.data.data)
    }

  }

  const imageUrl = [
    "https://th.bing.com/th/id/OIP.c2yh-vjm-Ze872ygDBhg3QHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.hF8_3tDhRrZvxm-j1kZwgwHaE9?w=243&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.PA_USRL68UjTfF0kRo5ImQHaEo?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th/id/OIP.t57OzeATZKjBDDrzXqbc5gHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  ]

  async function submitComment(e) {
    e.preventDefault()
    if (commentInputData) {
      const response = await makeComment(videoId, commentInputData)
      if (response) {
        const responseData = await getVideoComments(videoId)
        setComments(responseData?.data.data.retrivedVideoComments)
      }
    }
  }

  useEffect(() => {
    getVideoComments(videoId).then((response) => {
      setComments(response?.data.data.retrivedVideoComments)
    })
  }, [])

  useEffect(() => {
    const userId = currentUserData?._id
    comments?.forEach((value) => {
      getCommentLikes(value?._id, userId).then((val) => {
        setCommentLikes((previous) => ({
          ...previous,
          [val?.data.data.commentId]: {
            isUserLiked: val?.data.data.isUserLiked,
            likeCount: val?.data.data.likeCount
          }
        }))
      })
    }
    )
  }, [comments, commentLikesData])


  // useEffect(() => {
  //   async function getLikeOfComments(commentId) {
  //     const userId = currentUserData?._id
  //     const response = await getCommentLikes(commentId, userId)
  //     // console.log(response.data.data.likeCount);
  //     return response.data.data
  //   }
  // }, [])

  async function likeComment(e, commentId) {
    // console.log('valueId', commentId);
    e.preventDefault()
    const response = await toggleCommentLike(commentId)
    setCommentLikesData(response.data.data)
  }

  async function subscribeToChannel() {
    console.log('videoData', videoData?.owner)
    const response = await toggleSubscription(videoData?.owner)
    const res = await getSubscribersOfchannel(videoData?.owner)
    setSubscriberCount(res?.data.data.Subscribers)
    // console.log('subscribed Data', response?.data.data)
    if (response?.data.data.length > 0) {
      setSubscribed(true)
    } else if (response?.data.data.length == undefined) {
      setSubscribed(false)
    }
  }

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

            {videoData ? <CustomVideoPlayer duration={videoData?.duration} qualityObj={videoData?.videoUrl} /> : <div className="w-full aspect-video bg-[#4b3b5c] rounded-md"></div>}
          </div>

          <div className="flex flex-col text-white gap-4">
            <div className="flex items-start justify-between gap-2">
              {videoData ? <p className="text-xl">
                {videoData?.title > 100 ? videoData?.title.slice(0, 100) + '....' : videoData?.title}
              </p> :
                <div className="">
                  <p className="w-[35rem] h-4 bg-[#4b3b5c] rounded-md"></p>
                  <p className="w-40 h-4 bg-[#4b3b5c] rounded-md mt-3"></p>
                </div>
              }

              {videoData ? <img onClick={() => setSaveToPlaylist(true)} src="/dots.svg" className="w-6 cursor-pointer" alt="" /> : <div className="h-6 w-2 bg-[#4b3b5c] rounded-lg"></div>}
            </div>


            <div className="flex gap-3 items-center flex-wrap">

              <div className="flex justify-between gap-3 items-center">
                <div className="flex items-center gap-1">
                  {videoData ? <img onClick={() => {
                    console.log("Hola");
                  }} id='profile' className="w-9 h-9 rounded-full mr-2 object-cover" src={userData?.avatar} alt="Avatar of Jonathan Reinink" /> : <div className="w-9 h-9 bg-[#4b3b5c] rounded-full mr-2"></div>
                  }
                  <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                    <div className='flex flex-col'>
                      {videoData ? <div className="text-lg">{userData?.fullName}</div> : <div className="w-20 h-3 bg-[#4b3b5c] rounded-md mt-3"></div>}
                      {videoData ? <div className="text-sm">{subscriberCount} subscribers</div> : <div className="w-10 h-2 bg-[#4b3b5c] rounded-md mt-3"></div>}
                    </div>
                  </div>
                </div>

                <div>
                  {videoData ? <button type="button" onClick={subscribeToChannel} className={`${subscribed ? 'bg-[#0502086e] text-white backdrop-blur-sm border-[1.5px] border-[#6b6767]' : 'bg-[#fff] text-black backdrop-blur-none'} font-medium rounded-full text-sm px-5 py-2.5 me-2 focus:outline-none`}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</button> : <div className="w-28 rounded-full px-5 py-2.5 me-2 bg-[#4b3b5c] h-10"></div>}
                </div>
              </div>


              {videoData ? <div className="flex gap-5 items-center justify-between border-2 py-[0.300rem] px-2 rounded-full">
                <div className="flex items-center">
                  <div className="cursor-pointer" onClick={toggleLikes}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill={likesData?.isUserLiked ? "white" : "none"} stroke={likesData?.isUserLiked ? 'blue' : 'white'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                  </div>
                  {likesData?.likeCount}
                </div>

                <div className="bg-white h-[1.3rem] w-[0.10rem] relative -z-10"></div>

                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>
                </p>
              </div> : <div className="w-28 rounded-full px-5 py-2.5 me-2 bg-[#4b3b5c] h-10"></div>}

            </div>
          </div>

          <div className="description text-white mt-7 w-full bg-[#0b0415c2] p-3 rounded-md">
            <div className="flex gap-3 items-center font-semibold text-md">
              <h4>132 views</h4>
              {formatTimeDifference(videoData?.createdAt)}
            </div>
            <p className="text-md mt-2">{videoData?.description}</p>
          </div>


          <div className="comment">
            <div className="w-full text-white rounded-lg my-4">
              <form>
                <h3 className="font-bold mt-10">Comments</h3>

                <div className="w-full my-2">
                  <textarea
                    className="bg-[#0000] border-x-0 border-t-0 border-b-2 outline-none border-gray-400 leading-normal resize-none w-full h-12 py-2 px-3 font-medium text-[#c1c1c1] placeholder-[#aeaeae] focus:border-[#ffffff]"
                    name="body"
                    placeholder="Type Your Comment"
                    onChange={(e) => setCommentInputData(e.target.value)}
                  ></textarea>
                </div>
                <div className="w-full flex justify-end px-3">
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-full text-white text-sm bg-indigo-500"
                    onClick={submitComment}
                  >Post Comment</button>
                </div>
                <div className="flex flex-col">
                  {comments?.map((value, index) => (
                    <div key={index} className="rounded-md p-3 ml-3">
                      <div className="flex gap-4 items-start">
                        <img
                          src={value?.userDetails.avatar}
                          className="object-cover w-8 h-8 rounded-full"
                          alt="User avatar"
                        />

                        <div>
                          <h3 className="font-bold">{value?.userDetails.username}</h3>
                          <p className="text-gray-400 mt-2">{value?.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              className="flex items-center text-gray-500 hover:text-blue-500"
                              onClick={(e) => likeComment(e, value?._id)}
                            >
                              <span className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill={commentLikes[value?._id]?.isUserLiked ? "white" : "none"} stroke={commentLikes[value?._id]?.isUserLiked ? "blue" : "white"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                              </span>
                              {commentLikes[value?._id]?.likeCount || 0}
                            </button>
                            <button
                              className="flex items-center text-gray-500 hover:text-blue-500"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <span className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex items-center gap-2 mt-2">
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
                      </div> */}
                    </div>
                  ))}

                  <button className="bg-[#242222a9] py-1 lg:hidden">Show more</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="right flex flex-col flex-grow gap-3">
          {imageUrl.map((url, index) => (
            <div key={index} className="flex gap-3 rounded-xl">
              <div className="flex-shrink-0">
                <img className="rounded-sm w-40 h-[5.8rem] object-cover" src={url} alt="" />
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