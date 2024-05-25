import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] md:pt-64 md:px-12 absolute bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl pl-8 md:pl-0 font-bold text-white'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/4 text-white'>{overview}</p>
        <div className='hidden md:block'>
            <button className='bg-blue-500 text-white p-4 px-16 text-lg bg-opacity-50 hover:bg-opacity-80 rounded-lg border-none cursor-pointer'><span className='mr-2'>▶️</span>  <span>Play</span></button>
            <button className='bg-violet-500 text-white p-4 px-16 text-lg bg-opacity-50 hover:bg-opacity-80 rounded-lg border-none ml-5 cursor-pointer'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle