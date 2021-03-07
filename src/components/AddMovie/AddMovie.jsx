import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

// Material-UI
import {
  Button,         // replaces <button>
  ButtonGroup,    // acts as a div for <button>s
  FormControl,    // acts as a div for individual inputs on a form
  FormHelperText, // adds text relevant to input below input
  Grid,           // creates a responsive grid layout, <Grid container> and <Grid item>
  InputLabel,     // replaces <label>
  MenuItem,       // replaces <option> in a <select>
  Paper,          // acts as a div, but gives a raised paper effect
  Select,         // replaces <select>
  TextField,      // versatile text input field
  Typography,     // replaces all <h1>, <h2>, etc.
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material-UI styling
const useStyles = makeStyles((theme) => ({
  addMovieForm: {
    marginTop: '2rem',
    padding: '1rem'
  },
  addMoviePaper: {
    padding: '1.5rem',
    margin: '1rem'
  },
  formTitle: {
    padding: '2rem'
  }
}));

/**
 * AddMovie Renders the Add Movie Form
 *
 * On load, AddMovie uses saga to fetch the list of genres available and store it in redux.
 * On submission, each input is validated for "clean" data. Implements sweetAlert for validation.
 * If successful, the user will be routed back to home page on save and will receive a success notification.
 */

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
  
  // On page load, fetch genres from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const handleCancelButton = () => {
    history.push('/');
  } // end handleCancelButton

  // Handles Submission Event
  const saveMovie = (event) => {
    event.preventDefault();
    // check for any blank inputs
    if (
      newMovie.title === '' || 
      newMovie.poster === '' || 
      newMovie.genre_id === '' || 
      newMovie.description === ''
    ) { // if any are blank, sweetAlert will cancel the submission
      return swal({
        title: 'Seems you forgot something.',
        text: 'Please fill out each input before submission.'
      });
    } else {
      // to prevent early submission, sweetAlert asks:
      swal({
        title: "Ready to Add?",
        text: "Do you want to look at your submission once more before completion?",
        buttons: true,
        dangerMode: true,
      })
      .then((willAdd) => {
        // if the user hits okay button, dispatch data to saga
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
    <Grid container align="center" justify="center">

      {/* Page Title */}
      <Grid item xs={12}>
        <Typography className={classes.formTitle} variant="h2">Add a Movie to the List!</Typography>
      </Grid>

      {/* Rendered Form Item w/ Buttons */}
      <Grid item>
        <Paper elevation={5} className={classes.addMoviePaper}>
          <Grid container>
            
            {/* Form */}
            <Grid item xs={12}>
                <form className={classes.addMovieForm} id="add-movie-form">
                  <Grid container spacing={2}>

                    {/* Movie Title Input */}
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

                    {/* Movie Poster Input */}
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

                    {/* Movie Genre Selector */}
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        {/* Material-UI doesn't accept label as attribute for Select */}
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
                          {/* This will be the first item displayed, validation does not allow it to be submitted */}
                          <MenuItem value="">
                            <em>Choose a Genre</em>
                          </MenuItem>

                          {/* Renders our drop down from DB */}
                          {genres.map(genre => <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)}

                        </Select>
                        <FormHelperText>Choose a genre for the movie.</FormHelperText>
                      </FormControl>
                    </Grid>

                    {/* Description Input */}
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

            {/* Contains Cancel and Save Button */}
            <Grid item xs={12}>
              <ButtonGroup size="large" variant="contained">

                {/* Cancel Button */}
                <Button 
                  color="secondary" 
                  form="add-movie-form" 
                  onClick={handleCancelButton}
                >
                  Cancel
                </Button>
                
                {/* Save Button */}
                <Button color="primary" onClick={saveMovie}>Save</Button>

              </ButtonGroup>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

    </Grid>
  );
} // end AddMovie

export default AddMovie;