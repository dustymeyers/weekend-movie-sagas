import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-Ui
import {
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material-Ui Styling
const useStyles = makeStyles((theme) => ({
  movieDescriptionWrapper: {
    margin: '2rem',
    padding: '2rem',
    width: '60%'
  }
}));

/**
 * MovieDetails Renders the Details of
 * the Movie Poster Previously Clicked
 * 
 */

function MovieDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const movieId = useParams();
  const movieDetails = useSelector(store => store.movieDetails);
  console.log('params:', movieId);
  // movieDetails state object as variables
  const movieTitle = movieDetails.title;
  const moviePosterImage = movieDetails.poster;
  const altImgText = `Poster for the movie ${movieTitle}`;
  const movieGenresArray = movieDetails.genres;
  const movieDescription = movieDetails.description;

  useEffect(() => {
    dispatch({ 
      type: 'FETCH_MOVIE_DETAILS',
      payload: movieId.id
    });
}, []);

  const handleClick = () => {
    console.log('clicked back button');

    history.push('/');
  }

  return(     
    <Paper elevation={5} className={classes.movieDescriptionWrapper}>
      <Grid container justify="center" align="center" spacing={5}> 
          
          {/* Movie Title */}
          <Grid item xs={12}>      
            <Typography variant="h2">{movieTitle}</Typography>
          </Grid>

          {/* Movie Poster */}
          <Grid item xs={5} >
            <Paper elevation={2}>
              <img className="movie-description-image" src={moviePosterImage} alt={altImgText} />
            </Paper>
          </Grid>

          {/* Genres display */}
          <Grid item xs={12}>
            <Typography variant="h4">
              Genres:

              {/* Genres Return as an Array, checks if its been defined in state */}
              {movieGenresArray ?
                movieGenresArray.map((genre, index) => {
                  // serializes commas, checking if the genre is the last item in the array 
                  return movieGenresArray.length - index === 1 ? 
                    <span key={index}> {genre}</span> :
                    <span key={index}> {genre}, </span>;
                }) :
                <span>No Genres Listed</span>}
            </Typography>
          </Grid>

          {/* Movie Description */}
          <Grid item>
            <Typography align="justify" paragraph variant="body1">{movieDescription}</Typography>
          </Grid>

          {/* Back Button, sends home */}
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleClick}>Back to List</Button>
          </Grid>
        
      </Grid>
    </Paper>  
  );
} // end MovieDetails

export default MovieDetails;
