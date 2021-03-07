import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';

// Material-Ui
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material-Ui Styling
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

function EditMovieDetails() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const paramsObject = useParams();
  const genres = useSelector(store => store.genres);
  const movieDetails = useSelector(store => store.movieDetails);

  let movieDetailsReduxState;

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });

    dispatch({ 
      type: 'FETCH_MOVIE_DETAILS',
      payload: paramsObject.id
    });
  }, [])

  if (movieDetails) {
    movieDetailsReduxState = movieDetails;
  } else {
    movieDetailsReduxState = {
      title: '',
      poster: '',
      genre_id: '',
      description: ''
    };
  }

  const [newMovie, setNewMovie] = useState(movieDetailsReduxState);

  const handleCancelButton = () => {
    
  } // end handleCancelButton

  const saveMovie = () => {

  } // end saveMovie

  return(
    <Grid container align="center" justify="center">

    {/* Page Title */}
    <Grid item xs={12}>
      <Typography className={classes.formTitle} variant="h2">Edit Movie</Typography>
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
} // end EditMovieDetails

export default EditMovieDetails;