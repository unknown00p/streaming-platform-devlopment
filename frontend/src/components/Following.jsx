import { useState } from 'react'

function Following() {
    const [isFollwoing, setIsFollwoing] = useState(Array(5).fill(false))
    const [follwoing, setFollwoing] = useState(true)

    function toggleFollow(i) {
        setIsFollwoing((prev) => {
            const newState = [...prev];
            newState[i] = !newState[i];
            return newState;
        });
    }
    return follwoing ? (
        <div className=''>
            {Array.from([1, 2, 3, 4, 5]).map((val, i) => (
                <div key={i} className='flex items-center justify-between py-2'>
                    <div className="flex items-center">
                        <img onClick={() => {
                            // console.log("Hola");
                        }} id='profile' className="w-10 h-10 rounded-full mr-2" src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?w=328&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Avatar of Jonathan Reinink" />
                        <div className="text-base flex flex-col gap-1 text-[#dfdede]">
                            <div className='flex flex-col'>
                                <div className="text-lg">Raj chaurasia</div>
                                <div className="text-sm">280k subscribers</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => toggleFollow(i)} className={isFollwoing[i] ? 'px-3 py-2 text-black bg-white' : 'px-3 py-2 text-white bg-[#3d3c3c61]'}>{isFollwoing[i] ? 'Following' : 'Follow'}</button>
                    </div>
                </div>
            ))}

        </div>
    ) : <div className='flex h-[15rem] justify-center flex-col text-white items-center'>
        <div className='flex flex-col justify-center items-center w-[18rem] gap-2'>
            <p>
                <img className='bg-[#45434370] p-2 rounded-full' src="/play.svg" alt="" />
            </p>

            <p>No people subscribed</p>
            <p className='text-sm text-center'>This page has yet to Subscribe a new person</p>
        </div>
    </div>
}

export default Following
