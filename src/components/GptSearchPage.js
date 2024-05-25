import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearchPage = () => {
  return (
    <>
      <div className='fixed w-full -z-10'>
            <img src={BG_URL} alt='movie-banner' className='w-full h-screen object-cover'/>
      </div>
      <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions/>
      </div>
    </>
  )
}

export default GptSearchPage;