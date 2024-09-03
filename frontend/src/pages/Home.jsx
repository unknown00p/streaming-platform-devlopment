import { useRef } from 'react'
import SideBar from '../subComponents/SideBar'
import { useNavigate } from 'react-router-dom'
// use NavLink to focus on current button


function Home() {
  const navigate = useNavigate()
  // const categoryRef = useRef()
  // const [loading, setLoading] = useState(true)

  const categories = [
    "All",
    "Music",
    "Source code",
    "Computer programming",
    "Mixes",
    "Live gaming",
    "Hans zimmer",
    "Annison",
  ]

  const videoClick = (e) => {
    const target = e?.target.id
    if (target !== "profile" && target !== "dot") {
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

  function getCurrentValue(e) {
    console.log(e.target.innerText);
  }

  return (
    <>
      <div className='flex'>
        <div className='left fixed hidden md:block'>
          <SideBar />
        </div>

        <div className='text-white fixed md:ml-[6rem] m-0 bg-[#0c0c0d] w-full py-3 top-[3.8rem] flex'>
          <button>left</button>
          <div className='flex gap-4 w-[1000px]'>
            {categories && categories.map((category, i) => {
              return <div key={i}>
                <button className='bg-[#32313180] hover:bg-[#323131dc] px-3 py-[0.300rem] rounded-md text-[1.1rem]' onClick={getCurrentValue}>{category}</button>
              </div>
            })}
          </div>
          <button>right</button>
        </div>

        <div className='right mt-10 pt-3'>
          <div className='md:ml-[6rem] ml-0 flex flex-wrap gap-[1.5rem] cursor-pointer'>
            {arr.map((value, i) => {
              return <div key={i}>
                <div onClick={(e) => {
                  videoClick(e)
                }} className="w-[22rem] rounded-xl overflow-hidden shadow-lg">
                  <div className=''>
                    <img className="object-cover rounded-xl" src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?w=328&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Sunset in the mountains" />
                  </div>
                  <div className="py-4">
                    <div className="flex gap-1">
                      <img onClick={() => {
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
