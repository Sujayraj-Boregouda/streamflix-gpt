import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {
  return (
    <div className='pt-12 pb-12 text-white'>
        <h1 className='font-bold text-lg md:text-4xl pb-12 px-12'>{title}</h1>
        <div className='flex overflow-x-scroll px-12'>
            <div className='flex'>
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} posterPath={movie.poster_path}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList;