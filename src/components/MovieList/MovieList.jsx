import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

// Material-Ui
import { 
  Button, 
  Card,
  CardHeader,
  CardMedia,
  Grid, 
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material-Ui Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  movieCard: {
    height: 350,
    background: 'black',
    color: 'white'
  },
  media: {
    height: 200,
    paddingTop: '56.25%',
  },
  movieListTitle: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  addMovieButton: {
    margin: '2rem'
  },
  listWrapper: {
    margin: '0 2rem 2rem 2rem',
    padding: '1.5rem'
  }

}));

/**
 * Renders List of Movies Added to Database
 * 
 * On load, each movie poster/title is rendered by fetching data with saga and setting it to a redux state.
 * Clicking on one will redirect you to a new page that renders that movie's details.
 * 
 * A button is rendered at the top of the page. It directs users to AddMovie form on click. 
 */

function MovieList() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleAddMovie = () => {
      history.push('/addMovie')
    } // end handleAddMovie

    // On poster click, route user to specific MovieDescription page
    // useEffect and useParams implemented in MovieDetails to fetch relevant data on load
    const handlePosterClick = (movieId) => {
      history.push(`/description/${movieId}`);
    } // end handlePosterClick

    return (
        <Grid 
          container 
          direction="column" 
          className={classes.root} 
          spacing={2}
        > 
          
          {/* Page specific header (separate from App header) includes title and add movie button */}
          <Grid item xs={12}>
            <Grid justify="center" align="center" container>

              {/* Title */}
              <Grid item xs={12}>
                <Typography align="center" variant="h2" className={classes.movieListTitle}>
                  Your Movie List
                </Typography>
                <Typography align="center" variant="h6">
                  Click on a movie poster or the "Add Movie" button.
                </Typography>
              </Grid>

              {/* Add Movie Button, routes to /addMovie on click */}
              <Grid item xs={3} >
                <Button 
                  className={classes.addMovieButton}
                  size="large" 
                  variant="contained" 
                  onClick={handleAddMovie}
                >
                  Add a Movie
                </Button>
              </Grid>

            </Grid>
          </Grid>

          {/* Rendered List of Movie Posters */}
          <Grid item xs={12}>
            <Paper elevation={5} className={classes.listWrapper}>
              <Grid 
                container 
                alignItems="center" 
                justify="space-evenly" 
                spacing={4} 
              >

                {/* Movie Cards Created with Movie Image, Title, and Id */}
                {movies.map(movie => {
                    return (
                        <Grid 
                          item 
                          key={movie.id} 
                          xs={3} 
                          onClick={() => handlePosterClick(movie.id)}
                        >
                          <Card className={classes.movieCard}>

                            {/* Movie Title */}
                            <CardHeader
                              title={movie.title}
                            />

                            {/* Movie Poster Image */}
                            <CardMedia
                              className={classes.media}
                              image={movie.poster} 
                              title={movie.title}                                
                            />
                          
                          </Card>                            
                        </Grid>
                    );
                })}

              </Grid>
            </Paper>
          </Grid>
        </Grid>
    );
}

export default MovieList;