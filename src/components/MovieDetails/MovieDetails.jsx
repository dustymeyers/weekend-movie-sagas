import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Material-Ui
import {
  Button,
  ButtonGroup,
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
 * After user has clicked a Movie Card from MovieList, the id for that movie is used
 * to change the url to an id specific parameter, simultaneously sending an action to saga.
 * That action fetches data from the DB specific to that movie and its genre. 
 * 
 * useParams has been implemented to re-fetch the movie data should the page be refreshed.
 * 
 * "Back to List" Button sends user back home. 
 */

function MovieDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsObject = useParams();
  const movieDetails = useSelector(store => store.movieDetails);
  
  // movieDetails state object as variables
  const movieTitle = movieDetails.title;
  const moviePosterImage = movieDetails.poster;
  const altImgText = `Poster for the movie ${movieTitle}`;
  const movieGenresArray = movieDetails.genres;
  const movieDescription = movieDetails.description;

  useEffect(() => {
    dispatch({ 
      type: 'FETCH_MOVIE_DETAILS',
      payload: paramsObject.id
    });
}, []);

  const handleBack = () => {
    console.log('clicked back button');

    history.push('/');
  }

  const handleEdit = () => {
    console.log('clicked edit button');

    history.push(`/edit/${paramsObject.id}`);
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
            <ButtonGroup variant="contained">
              <Button color="primary" onClick={handleBack}>Back to List</Button>
              <Button onClick={handleEdit}>Edit</Button>
            </ButtonGroup>
          </Grid>
        
      </Grid>
    </Paper>  
  );
} // end MovieDetails

export default MovieDetails;
