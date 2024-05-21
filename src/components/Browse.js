import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../customHooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'

const Browse = () => {
 
  // Custom Hook that does the job
  useNowPlayingMovies();

  return (
    <>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </>
  )
}

export default Browse;