import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

// Material-UI
import {
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addMovieTitle: {
    marginTop: '2rem',
    padding: '1rem',
  },
  addMovieForm: {
    marginTop: '2rem',
  },
  
}));

function AddMovie() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

  // local states for form input handling
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    genre_id: '',
    description: ''
  });
  
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const handleCancelButton = () => {
    history.push('/');
  } // end handleCancelButton

  const saveMovie = (event) => {
    event.preventDefault();
    if (
      newMovie.title === '' || 
      newMovie.poster === '' || 
      newMovie.genre_id === '' || 
      newMovie.description === ''
    ) {
      return swal({
        title: 'Seems you forgot something.',
        text: 'Please fill out each input before submission.'
      });
    } else {
    swal({
      title: "Ready to Add?",
      text: "Do you want to look at your submission once more before completion?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        dispatch({
          type: 'ADD_MOVIE',
          payload: newMovie
        });

        swal({
          title: "Your movie has been added!",
          icon: "success",
        });
        
        history.push('/');
      } else {
        swal("Add a movie when you're ready.");
      }
    });
    
    
    }
  } // end saveMovie

  return(
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography className={classes.addMovieTitle} variant="h2">Add a Movie to the List!</Typography>
      </Grid>
      <Grid item xs={12}> 
        
          <form /*className={classes.addMovieForm}*/ id="add-movie-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    helperText="Input a title for the movie"
                    id="title-input"
                    margin="normal"
                    label="Title:" 
                    variant="outlined"
                    value={newMovie.title} 
                    onChange={event => setNewMovie({...newMovie, title: event.target.value})}
                    type="text" 
                    placeholder="Title of Movie" 
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth> 
                  <TextField
                    helperText="Input an image address for the movie poster."
                    id="poster-input"
                    label="Poster:"
                    margin="normal"
                    variant="outlined"
                    value={newMovie.poster}
                    onChange={event => setNewMovie({...newMovie, poster: event.target.value})}
                    type="url" 
                    placeholder="Image Address" 
                    required
                  />
                </FormControl>
              </Grid> 

              <Grid item xs={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel margin="normal" shrink id="genre-input-selector">
                    Genre:
                  </InputLabel>

                  <Select
                    
                    labelId="genre-input-selector"
                    value={newMovie.genre_id} 
                    onChange={event => setNewMovie({...newMovie, genre_id: event.target.value})}
                    displayEmpty
                    required
                  >

                    <MenuItem value="">
                      <em>Choose a Genre</em>
                    </MenuItem>

                    {genres.map(genre => <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)}

                  </Select>
                  <FormHelperText>Choose a genre for the movie.</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>  
                <FormControl fullWidth color="secondary">
                  <TextField
                    helperText="Input a brief movie synopsys."
                    id="description-input"
                    margin="normal"     
                    label="Description:"
                    value={newMovie.description}
                    onChange={event => setNewMovie({...newMovie, description: event.target.value})}
                    placeholder="Movie Description" 
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        
      </Grid>
      <button form="add-movie-form" onClick={handleCancelButton}>Cancel</button>
      <button onClick={saveMovie}>Save</button>
    </Grid>
  );
} // end AddMovie

export default AddMovie;