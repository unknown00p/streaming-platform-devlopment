"use client"
import { VideoPlayer } from '@/components/video-player'
import React from 'react'

function page() {
    const onBackClick = () => {
        console.log("Back button clicked")
    }
  return (
    <div>
      <VideoPlayer onBackClick={onBackClick}/>
    </div>
  )
}

export default page
