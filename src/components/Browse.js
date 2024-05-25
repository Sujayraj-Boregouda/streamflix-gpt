import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../customHooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../customHooks/usePopularMovies'
import useTopRatedMovies from '../customHooks/useTopRatedMovies'
import useUpcomingMovies from '../customHooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import GptSearchPage from './GptSearchPage'

const Browse = () => {
  
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);



  // Custom Hook that does the job
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  
  return (
    <>
      <Header />
      {
      showGptSearch ? (
          <GptSearchPage/>) 
        :( 
          <>
          <MainContainer/>
          <SecondaryContainer/>
          </>
        )
      }
      
      
      
    </>
  )
}

export default Browse;