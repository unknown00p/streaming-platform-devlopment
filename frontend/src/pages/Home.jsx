import React, { useState } from 'react'
import SideBar from '../subComponents/SideBar'
import Skeleton from '../subComponents/Skeleton'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const videoClick = (e)=>{
    const target = e?.target.id
    if ( target !== "profile" && target !== "dot") {
      navigate("video")
    }
    if (target == "profile") {
      navigate("userSection")
    }    
    // navigate("video")
  }

  const arr = [
    "123",
    "123",
    "123",
    "123",
    "878",
    "878",
    "878",
    "878",
    "12312",
    "12312",
    "12312",
    "12312",
    "890",
    "890",
    "890",
    "890",
  ]

  return (
    <>
      <div className='flex'>
        <div className='left fixed'>
          <SideBar />
        </div>

        <div className='right mt-4'>
          <div className='ml-[6rem] flex flex-wrap gap-[1.5rem] cursor-pointer'>
            {arr.map((value, i) => {
              return <div key={i}>
                <div onClick={(e)=>{
                  videoClick(e)
                }} className="max-w-[22.6rem] rounded-xl overflow-hidden shadow-lg">
                  <div className=''>
                    <img className="object-cover w-[23rem] h-[13rem]" src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?w=328&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Sunset in the mountains" />
                  </div>
                  <div className="py-4">
                    <div className="flex gap-1">
                      <img onClick={()=>{
                        console.log("Hola");
                      }} id='profile' className="w-11 h-11 rounded-full mr-4" src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?w=328&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Avatar of Jonathan Reinink" />
                      <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                        <div className='flex gap-2'>
                          <div className="text-lg">Learn how to use Tailwind CSS card Learn how to use Tail...</div>
                          <div>
                            <img className='hover:bg-[#162b45] hover:rounded-full' id='dot' src="dots.svg" alt="" />
                          </div>
                        </div>
                        <p className="leading-none text-[#a1a1a1]">Jonathan Reinink</p>
                        <div className='flex gap-1 text-[#a1a1a1]'>
                          <p>173K views.</p>
                          <p>3 weaks ago</p>
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
    </>
  )
}

export default Home
