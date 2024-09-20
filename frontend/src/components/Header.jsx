import { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Input } from "../index"
import useHandleCssStore from '../zustand/useHandleCssStore';

function Header() {
  const toggleBarCss = useHandleCssStore((state) => state.toggelBarCss)
  const toggleSideBar = useHandleCssStore((state) => state.toggleSideBar)
  const coverAll = useHandleCssStore((state) => state.coverAll)
  const handleClickOutside = useHandleCssStore((state) => state.handleClickOutside)
  const [mobileSearch, setMobileSearch] = useState("hidden")
  const [headerClass, setHeaderClass] = useState("block")
  const navigate = useNavigate()
  const showUploadVideo = useHandleCssStore((state)=> state.showUploadVideo)

  useEffect(() => {
    handleClickOutside()
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside])


  function toggleSearch() {
    setMobileSearch("block")
    setHeaderClass("hidden")
  }

  function backToHeader() {
    setMobileSearch("hidden")
    setHeaderClass("block")
  }

  function uploadVideo() {
    navigate("/dashboard")
    showUploadVideo("block")
  }

  return (
    <>
      <div className=''>
        <div className={`${headerClass} md:block`}>
          <div className='flex text-white items-center justify-between px-7 pt-2 pb-5 text-[1.11rem] bg-[#13151a]'>
            <div className='flex items-center gap-8'>
              <button className='hidden sm:block' id='mainMenu' onClick={toggleSideBar}>
                <img src="/menubar.svg" alt="" />
              </button>
              <Link to={""} className='flex items-center gap-1'>
                <img className='w-[2.3rem]' src="/youtube-video.svg" alt="" srcSet="" />
                <span>Watch-here</span>
              </Link>
            </div>

            <div className='flex relative'>
              <Input
                className="w-[50vw] hidden md:block  rounded-full bg-[#13131400] h-11 px-5 text-[1.1rem] outline-none border-[#8d8d8d8b] border-[1px] text-white"
                placeholder="Search"
              />
              <div>
                <button className='absolute right-0 text-center mt-[0.60rem] mr-6'>
                  <img className='' src="/search.svg" alt="" />
                </button>
              </div>
            </div>

            <div className='flex gap-3 sm:gap-5'>
              <button onClick={toggleSearch} className='md:hidden'>
                <img src="/search.svg" alt="" />
              </button>
              <button>
                <img onClick={uploadVideo} className='uploadVideoBtn' src="/uploadVideo.svg" alt="" />
              </button>
              <Link to={"dashboard"}>
                <img src="/avatar.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>


        <div className={`${mobileSearch} md:hidden`}>
          <div className='flex relative pt-3 pb-[0.8rem] bg-[#13151a] justify-center'>
            <div className='flex gap-6'>
              <button onClick={backToHeader}>
                <img src="/leftArrow.svg" alt="" />
              </button>
              <Input
                className="w-[80vw] md:block  rounded-full bg-[#13131497] h-11 px-5 text-[1.1rem] outline-none border-[#8d8d8d8b] border-[1px] text-white"
                placeholder="Search"
              />
            </div>
            <div>
              <button className='absolute text-center ml-[-3rem] mt-[0.60rem]'>
                <img className='' src="/search.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className={`${coverAll}`}>
          <aside id="logo-sidebar" className={`fixed overflow-hidden top-0 ${toggleBarCss} w-64 h-screen transition-all`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 bg-gray-50 dark:bg-[#13151a]">

              <div className='flex items-center pb-5 gap-5 pl-1'>
                <div>
                  <img className='cursor-pointer slideLeft' src="/menubar.svg" alt="" />
                </div>

                <Link to={""} className="flex items-center ps-2.5">
                  <div className='flex items-center gap-1'>
                    <img className='w-[2.5rem]' src="/youtube-video.svg" alt="" srcSet="" />
                    <span className='text-white text-[1.1rem]'>Watch-here</span>
                  </div>
                </Link>
              </div>

              <ul className="space-y-2 h-[88vh] font-medium pb-3 overflow-auto scrollbar">
                <li>
                  <Link to="" className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/home.svg" alt="" />
                    <span className="ms-3">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/subscription.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Subscriptions</span>
                  </Link>
                </li>
                <div className='border-[0.2px] opacity-10'></div>

                <div className='flex text-xl items-center w-[5rem] mt-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group p-2 cursor-pointer'>
                  <div className=''>
                    You
                  </div>
                  <img src="/chevronRight.svg" alt="" />
                </div>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/currentUser.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Your channel</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/history.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/playlist.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Playlist</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/videos.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Your videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/like.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Liked videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/download.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Downloads</span>
                  </Link>
                </li>

                <div className='border-[0.2px] opacity-10'></div>
                <div className='flex text-xl items-center w-[9rem] mt-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group p-2 cursor-pointer'>
                  <div className=''>
                    Subscriptions
                  </div>
                </div>

                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/like.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Liked videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="/download.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Downloads</span>
                  </Link>
                </li>

              </ul>
            </div>
          </aside>
        </div>
      </div>

    </>

  )
}

export default Header
