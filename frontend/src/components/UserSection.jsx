import React, { useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import userData from '../zustand/userData';
import SideBar from '../subComponents/SideBar';

function UserSection() {
    const currentUserData = userData((state) => state.currentUserData);
    const navigate = useNavigate();
    const { userId } = useParams()
  
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
  
                {/* Main Content Skeleton */}
                {/* <div className='text-white pb-20 sm:pb-0 w-[95%] m-auto'>
                  <div className='skeleton-main-content'></div>
                </div> */}
              </div>
            </div>
          }
  
          {/* <div className='lg:ml-[7.7rem] mt-7'>
            <div className='text-white pb-20 sm:pb-0 w-[95%] m-auto'>
              <Outlet />
            </div>
          </div> */}
        </div>
      </div>
    )
}

export default UserSection
