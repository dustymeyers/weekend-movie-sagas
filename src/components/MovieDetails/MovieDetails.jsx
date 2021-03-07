import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  root: {

  },
  posterImage: {

  }
}));

/**
 * MovieDetails Renders the Details of
 * the Movie Poster Previously Clicked
 * 
 */

function MovieDetails() {
  const classes = useStyles();
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
    <Grid item>    
      <Paper elevation={5}>
        <Grid container justify="center" align="center" spacing={5}> 
            
            <Grid item xs={12}>      
              <Typography variant="h2">{movieTitle}</Typography>
            </Grid>

            <Grid item xs={4} >
              <Paper elevation={2}>
                <img src={moviePosterImage} alt={altImgText} />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">
                Genres:
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

            <Grid item>
              <Typography variant="body1">{movieDescription}</Typography>
            </Grid>

            <Grid item>
              <Button color="primary" variant="contained" onClick={handleClick}>Back to List</Button>
            </Grid>
          
        </Grid>
      </Paper>  
    </Grid>
  );
} // end MovieDetails

export default MovieDetails;
