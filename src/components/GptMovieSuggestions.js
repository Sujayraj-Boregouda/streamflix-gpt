import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {


  const showGptSearchResults = useSelector((store) => store.gpt)

  const { movieNames, movieResults } = showGptSearchResults;

  if(!movieNames || !movieResults)  return null;
  
  return (
   <div className="p-4 m-4 bg-black text-white bg-opacity-85">
    <div className="pb-24">
      {movieNames.map((movieName, i) => (
        <MovieList key={movieName} title={movieName} movies={movieResults[i]} />
      ))}
    </div>
   </div> 
  )
}

export default GptMovieSuggestions