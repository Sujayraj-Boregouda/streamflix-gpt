import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants"
import { useRef } from "react";
import openAI from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector(store => store.config.lang);
  
  const searchText = useRef(null);

  // Search Movie in TMDB 
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=' + movie,
        API_OPTIONS // Ensure this is an object with necessary fetch options
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const json = await response.json();
      return json.results;
    } catch (err) {
      console.error(err);
    }
  };
    
  const handleGptSearchClick = async () => {
    try {
      // Make an API call to get the movie results
      const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + ". only give me names of 5 movies, comma separated. like the example result given ahead. Example Result: Gadar, Krish, Sholey, Phir Hera pheri, Koi Mil Gaya";
  
      const gptResults = await openAI.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
  
      if (!gptResults.choices || gptResults.choices.length === 0) {
        throw new Error('No choices returned from GPT API');
      }
  
      const gptMovies = gptResults.choices[0].message.content.split(", ");
  
      if (gptMovies.length === 0) {
        throw new Error('GPT did not return any movie names');
      }
  
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbSearchResults = await Promise.all(promiseArray);
      
      dispatch(addGptMovieResult({MovieNames: gptMovies, MovieResults: tmdbSearchResults}))
      
    } catch (error) {
      console.error('Error occurred:', error.message);
      // Display an error message to the user or take other appropriate actions
    }
  };
  

  return (
    <div className="pt-[50%] md:pt-[15%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type="text" className="p-2 md:p-4 m-3 md:m-4 col-span-9 md:col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="py-2 px-4 m-3 md:m-4 bg-red-700 text-white rounded-lg col-span-3 md:col-span-3" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;