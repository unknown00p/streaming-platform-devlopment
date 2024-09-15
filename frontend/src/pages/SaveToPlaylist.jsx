import React from 'react'

function SaveToPlaylist() {
  return (
    <div className='flex justify-center text-white'>
      <div className='bg-[#151826] rounded-sm gap-3 p-10 flex flex-col justify-center'>
        <div className='flex items-center justify-between'>
          <p>Save to playlist</p>
          <img src="x.svg" alt="" />
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
          <input type="text" className='w-56 h-8 rounded-md px-2 text-black' placeholder='enter playlist name'/>
        </div>

        <div>
          <button className='bg-[#24094b] text-[#fff] rounded-md text-md px-2 py-1'>create new playlist</button>
        </div>
      </div>
    </div>
  )
}

export default SaveToPlaylist
