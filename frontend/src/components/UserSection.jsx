import React, { useState,useEffect } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import userData from '../zustand/userData';
import SideBar from '../subComponents/SideBar';
import {watchHistory} from "../api/authentication/authApi"
import formatTimeDifference from '../hooks/formateTime';

function UserSection() {
    const currentUserData = userData((state) => state.currentUserData);
    const navigate = useNavigate();
    const [history, setHistory] = useState([])
  
    const deskCategories = [
      {
        "id": 0,
        "name": "Videos",
        "url": "videos"
      },
      {
        "id": 1,
        "name": "Playlist",
        "url": "playlist"
      },
      {
        "id": 2,
        "name": "Tweets",
        "content": <div>Tweets</div>,
        "url": "tweets"
      },
      {
        "id": 3,
        "name": "Following",
        "url": "following"
      },
    ]

    useEffect(() => {
      async function getResult() {
        const result = await watchHistory()
        setHistory(result?.data.data)
      }

      getResult()
    }, [])
    
    console.log(history)

  
    if (currentUserData.notUser) {
      return (
        <div className='h-full w-full flex items-center flex-col gap-2 justify-center text-white mt-72'>
          <div>Please log in</div>
          <button onClick={() => navigate('/login')} className='bg-blue-700 w-28 px-9 py-2 rounded-sm'>Login</button>
        </div>
      );
    }
  
    return (
      <div className='mt-20'>
        <div>
          <div className='sm:left-[8px] sm:top-20 fixed sm:hidden z-40 sm:z-0 lg:block bottom-[0px] lg:bottom-auto w-full lg:w-[5rem]'>
            <SideBar />
          </div>
        </div>
  
        <div>
          {currentUserData.loading == false ?
            <div className='lg:ml-[8rem]'>  
              <div className='px-4'>
                <div className='flex justify-between items-center gap-3 flex-col sm:flex-row w-full pr-3  sm:pt-3'>
                  <div className='flex gap-3 flex-col sm:flex-row'>
                    <div>
                      <img src={currentUserData.data?.avatar} className='w-28 h-28 rounded-full object-cover' alt="" />
                    </div>
  
                    <div className='text-white flex flex-col gap-1 top-[-3rem] sm:static pl-2 sm:pl-0'>
                      <div className='flex justify-between items-center'>
                        <p className='text-2xl font-bold'>{currentUserData.data?.username}</p>
  
                        <Link to={"/"}>
                          <div className='text-white gap-2 flex sm:hidden'>
                            <img src="/leftArrow.svg" alt="" />
                            <p>
                              back
                            </p>
                          </div>
                        </Link>
                      </div>
  
                      <p className='text-[#c1bfbf]'>@{currentUserData.data?.fullName}</p>
                      <div className='flex gap-1 items-center text-[#b8b8b8] text-sm'>
                        <p>600k Subscribers</p>
                        <img src="dot.svg" alt="" />
                        <p>120 Subscribed</p>
                      </div>
                      {/* <div className="bg-slate-700 rounded-full px-3 text-sm">edit profile</div> */}
                    </div>
                  </div>
                </div>

                <div className='pt-7'>
                  <div className='text-xl font-semibold flex justify-between items-center pr-3'>
                    <h1>History</h1>
                    <button className='px-3 py-1 rounded-full text-base border-[0.8px] '>view all</button>
                  </div>

                  <div className='grid grid-cols-5 gap-2 pt-4'>
                  {history && history.map((value) => {
                      return <div key={value?._id} className=''>
                        <div onClick={(e) => {
                          videoClick(e)
                        }} className="rounded-xl shadow-lg">
                          <div className=''>
                            <img className="object-cover w-full h-[8rem] rounded-lg" src={value?.thumbnail} alt="Sunset in the mountains" />
                          </div>
                          <div className="flex justify-between py-2 h-[120px]">
                            <div className="flex gap-1">
                              <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                                <div className='flex gap-2 items-baseline'>
                                  <div className="text-base font-semibold">{value?.title.length > 30 ? value.title.substring(0, 30) + '...' : value.title}</div>
                                  <div>
                                  </div>
                                </div>
                                {/* <p className="leading-none text-[#a1a1a1]">{value?.description.length > 90 ? value.description.substring(0, 90) + "..." : value.description}</p> */}
                                <div className='gap-1 text-sm text-[#a1a1a1]'>
                                  <h1>{value?.owner.username}</h1>
                                  <div className='flex'>
                                    <p>173K views.</p>
                                    <p>{formatTimeDifference(value?.createdAt)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p>
                              <img className='hover:bg-[#b0afaf8d] rounded-full cursor-pointer' src="dots.svg" alt="" />
                            </p>
                          </div>
                        </div>
                      </div>
                  })} 

                  </div>
                </div>

              </div>

            </div>
            : <div>
              {/* Cover Image Skeleton */}
              <div className='lg:ml-[6rem]'>  
                {/* Profile Info Skeleton */}
                <div className='px-4'>
                  <div className='flex justify-between gap-3 flex-col sm:flex-row w-full pr-3 sm:pt-3'>
  
                    {/* Avatar and User Info Skeleton */}
                    <div className='flex gap-3 flex-col sm:flex-row'>
                      <div className='skeleton-avatar'></div>
  
                      <div className='text-white flex flex-col gap-1 top-[-3rem] relative sm:static pl-2 sm:pl-0'>
                        <div className='flex justify-between items-center'>
                          <div className='skeleton-text skeleton-username'></div>
                          {/* <div className='skeleton-text skeleton-back'></div> */}
                        </div>
  
                        <div className='skeleton-text skeleton-fullname'></div>
                        <div className='flex gap-1 items-center text-[#b8b8b8] text-sm'>
                          <div className='skeleton-text skeleton-subscriber'></div>
                          <div className='skeleton-dot'></div>
                        </div>
                      </div>
                    </div>
  
                    {/* Action Button Skeleton */}
                    <div className='skeleton-button'></div>
                  </div>
                </div>
              </div>
  
              {/* Navigation Skeleton */}
              <div className='lg:ml-[6rem]'>
                <div className='flex justify-center'>
                  <div className='flex justify-between text-white border-b-2 w-[95%] gap-1 py-2'>
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className='skeleton-nav-item'></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
}

export default UserSection
