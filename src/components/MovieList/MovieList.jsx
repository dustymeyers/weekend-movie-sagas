import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

// Material-Ui
import { 
  Card,
  CardHeader,
  CardMedia,
  Grid, 
  Button, 
  Paper, 
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'linear-gradient(45deg, #564d4d 30%, #831010 90%)'
  }, 
  movieCard: {
    height: 350,
  },
  media: {
    height: 200,
    paddingTop: '56.25%',
  },
  movieListTitle: {
    color: '#FFFFFF',
    padding: '1rem',
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
        <Grid container className={classes.root} spacing={2}> 

          <Grid item xs={12}>
            <Grid justify="center" container>
              <Grid item xs={12}>
                <Typography variant="h2" className={classes.movieListTitle}>Your Movie List</Typography>
              </Grid>

              <Grid item xs={3}>
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

          <Grid item xs={12}>
            
              <Grid 
                container 
                alignItems="center" 
                justify="space-evenly" 
                spacing={4} 
              >
                  {movies.map(movie => {
                      return (
                          <Grid item key={movie.id} xs={2}>
                              <Card elevation={3} className={classes.movieCard}>
                                <CardHeader
                                  title={movie.title}
                                />
                                <CardMedia
                                  className={classes.media}
                                  image={movie.poster} 
                                  title={movie.title} 
                                  onClick={() => handlePosterClick(movie.id)}
                                />
    
                               </Card>
                              
                          </Grid>
                      );
                  })}
              </Grid>
            
          </Grid>

        </Grid>

    );
}

export default MovieList;