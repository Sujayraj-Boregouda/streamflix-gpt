import { useEffect } from 'react'
import { API_OPTIONS, TOP_RATED_MOVIES } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice'

const useTopRatedMovies = () => {
    // Fetch Data from TMDB API and update Stored Movies
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
    const dispatch = useDispatch();
    
    const getTopRatedMovies = async () => {
      const data = await fetch(TOP_RATED_MOVIES, API_OPTIONS);
      const json = await data.json();
      
      dispatch(addTopRatedMovies(json.results));
    }
 
    useEffect(() => {
      if(!topRatedMovies){
        getTopRatedMovies();
      }
    }, []);
}

export default useTopRatedMovies