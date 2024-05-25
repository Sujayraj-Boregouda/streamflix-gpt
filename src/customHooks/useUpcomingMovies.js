import { useEffect } from 'react'
import { API_OPTIONS, UPCOMING_MOVIES_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUpcomingMovies } from '../utils/moviesSlice'

const useUpcomingMovies = () => {
    // Fetch Data from TMDB API and update Stored Movies
    const upComingMovies = useSelector((store) => store.movies.upComingMovies)
    const dispatch = useDispatch();
    
    const getUpcomingMovies = async () => {
      const data = await fetch(UPCOMING_MOVIES_URL, API_OPTIONS);
      const json = await data.json();
      
      dispatch(addUpcomingMovies(json.results));
    }
 
    useEffect(() => {
      if(!upComingMovies){
        getUpcomingMovies();
      }
    }, []);
}

export default useUpcomingMovies