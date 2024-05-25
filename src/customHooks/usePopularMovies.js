import { useEffect } from 'react'
import { API_OPTIONS, POPULAR_MOVIES_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'

const usePopularMovies = () => {

   // Fetch Data from TMDB API and update Stored Movies
   const popularMovies = useSelector((store) => store.movies.popularMovies)
   const dispatch = useDispatch();

   const getPopularMovies = async () => {
     const data = await fetch(POPULAR_MOVIES_URL, API_OPTIONS);
     const json = await data.json();
     
     dispatch(addPopularMovies(json.results));
   }

   useEffect(() => {
    if(!popularMovies) {
      getPopularMovies();
    }
   }, []);
}

export default usePopularMovies;