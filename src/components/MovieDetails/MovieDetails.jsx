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
  console.log(movieGenresArray);

  return(
    <>
      <h2>{movieTitle}</h2>
      <img src={moviePosterImage} alt={altImgText} />
      <h3>Genres:</h3>
      <h3>
        {movieGenresArray
          ? movieGenresArray.map((genre, index) => {
              if (movieGenresArray.length - index === 1 ) {
                return <span key={index}>{genre}</span>;
              } else {
                return <span key={index}>{genre}, </span>;
              }
            })
          : <span>no genres</span>}
      </h3>

      <p>{movieDescription}</p>
      
    </>
  );
} // end MovieDetails

export default MovieDetails;
