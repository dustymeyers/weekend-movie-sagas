import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

// Material-Ui
import { 
  Grid, 
  Button, 
  Paper, 
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
                <h1>MovieList</h1>
              </Grid>

              <Grid item xs={3}>
                <Button color="primary" onClick={handleAddMovie}>Add a Movie</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            
              <Grid container alignItems="center" justify="space-evenly" spacing={4} >
                  {movies.map(movie => {
                      return (
                          <Grid item key={movie.id} xs={2}>
                              <Paper elevation={3}>
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} onClick={() => handlePosterClick(movie.id)}/>
    
                               </Paper>
                              
                          </Grid>
                      );
                  })}
              </Grid>
            
          </Grid>

        </Grid>

    );
}

export default MovieList;