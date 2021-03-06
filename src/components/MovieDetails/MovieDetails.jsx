import { useSelector } from 'react-redux';

/**
 * MovieDetails Renders the Details of
 * the Movie Poster Previously Clicked
 * 
 */

function MovieDetails() {
  const movieDetails = useSelector(store => store.movieDetails);
  
  const movieTitle = movieDetails.title;
  const moviePosterImage = movieDetails.poster;
  const altImgText = `Poster for the movie ${movieTitle}`;
  const movieGenresArray = movieDetails.genres;
  const movieDescription = movieDetails.description;

  return(
    <main>
      <h2>{movieTitle}</h2>
      <img src={moviePosterImage} alt={altImgText} />
      <h3>Genres:</h3>
      <h3>
        {movieGenresArray ?
          movieGenresArray.map((genre, index) => {
            // serializes commas, checking if the genre is the last item in the array 
            return movieGenresArray.length - index === 1 ? 
              <span key={index}>{genre}</span> :
              <span key={index}>{genre}, </span>;
          }) :
          <span>No Genres Listed</span>}
      </h3>

      <p>{movieDescription}</p>
      
    </main>
  );
} // end MovieDetails

export default MovieDetails;
