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
    padding: '1rem',
  },
  addMovieButton: {
    margin: '2rem'
  },
  listWrapper: {
    margin: '1rem',
    padding: '1.5rem'
  }

}));

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

    const handlePosterClick = (movieId) => {
      console.log('poster clicked', movieId);
      // sends movieId to our generator function that will
      // use an axios GET to fetch movie details for movieId
      // including genres
      
      dispatch({ 
        type: 'FETCH_MOVIE_DETAILS',
        payload: movieId
      });

      history.push('/details');
    } // end handlePosterClick

    return (
        <Grid 
          container 
          direction="column" 
          className={classes.root} 
          spacing={2}
        > 
          
          {/* Page specific header (sepperate from App header) */}
          <Grid item xs={12}>
            <Grid justify="center" align="center" container>

              {/* Title */}
              <Grid item xs={12}>
                <Typography align="center" variant="h2" className={classes.movieListTitle}>Your Movie List</Typography>
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
                          xs={2} 
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