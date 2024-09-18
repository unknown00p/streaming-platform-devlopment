import { useState } from 'react'
import Input from '../subComponents/Input';

function Tweets() {
  const [hasTweets, setHasTweets] = useState(true)
  const [currentUser, setCurrentUser] = useState(false)

  return hasTweets ? (
    <div className="comment">
      <div className="w-full bg-[#13151a] text-white rounded-lg my-4">
       {currentUser && <div className='relative'>
          <Input
            className="w-full rounded-sm bg-[#13131400] h-16 px-5 pr-12 text-[1.1rem] outline-none border-[#8d8d8d8b] border-[1.5px] text-white"
            placeholder="Write an announcment"
          />
          <button className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#c6c1c1] bg-[rgb(102,31,189)] font-medium rounded-sm text-sm px-5 py-2.5 me-2 focus:outline-none'>
            Send
          </button>
        </div>}
        <div className="flex flex-col">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="rounded-md py-4">
              <div className="flex gap-4 items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                  alt="User avatar"
                />
                <h3 className="font-bold">Unknown chaurasiya</h3>
              </div>
              <p className="text-gray-400 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis id est placeat voluptatum repellendus temporibus voluptates debitis esse cumque, enim quisquam delectus, facilis, non exercitationem dolor odit pariatur! Quos, nihil!</p>
              <div className="flex items-center gap-2 mt-2">
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
                  233
                </button>
              </div>
              <hr />
            </div>

          ))}
        </div>
      </div>
    </div>
  ) : <div className='flex h-[15rem] justify-center flex-col text-white items-center'>
    <div className='flex flex-col justify-center items-center w-[18rem] gap-2'>
      <p>
        <img className='bg-[#45434370] p-2 rounded-full' src="/play.svg" alt="" />
      </p>

      <p>No announcements</p>
      <p className='text-sm text-center'>This page has yet to make an announcements</p>
    </div>
  </div>
}

export default Tweets
