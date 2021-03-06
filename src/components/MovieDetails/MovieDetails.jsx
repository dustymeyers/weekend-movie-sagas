import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * MovieDetails Renders the Details of
 * the Movie Poster Previously Clicked
 * 
 */

function MovieDetails() {
  const history = useHistory();
  const movieDetails = useSelector(store => store.movieDetails);
  
  const movieTitle = movieDetails.title;
  const moviePosterImage = movieDetails.poster;
  const altImgText = `Poster for the movie ${movieTitle}`;
  const movieGenresArray = movieDetails.genres;
  const movieDescription = movieDetails.description;

  const handleClick = () => {
    console.log('clicked back button');

    history.push('/');
  }

  return(
    <main>
      <h2>{movieTitle}</h2>
      <img src={moviePosterImage} alt={altImgText} />

      <h3>
        Genres:
        {movieGenresArray ?
          movieGenresArray.map((genre, index) => {
            // serializes commas, checking if the genre is the last item in the array 
            return movieGenresArray.length - index === 1 ? 
              <span key={index}> {genre}</span> :
              <span key={index}> {genre}, </span>;
          }) :
          <span>No Genres Listed</span>}
      </h3>

      <p>{movieDescription}</p>

      <button onClick={handleClick}>Back to List</button>
      
    </main>
  );
} // end MovieDetails

export default MovieDetails;
