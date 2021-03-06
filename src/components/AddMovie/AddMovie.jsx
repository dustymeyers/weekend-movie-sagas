import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
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

    dispatch({
      type: 'ADD_MOVIE',
      payload: newMovie
    });

    history.push('/');
  } // end saveMovie

  return(
    <>
      <h2>Add a Movie to the List!</h2>
      <form>
        <label>
          Add the Movie's Title:
          <input 
            value={newMovie.title} 
            onChange={event => setNewMovie({...newMovie, title: event.target.value})}
            type="text" 
            placeholder="Title of Movie" 
          />
        </label>

        <label>
          Upload the Movie's Poster:
          <input 
            value={newMovie.poster}
            onChange={event => setNewMovie({...newMovie, poster: event.target.value})}
            type="text" 
            placeholder="Image Address" 
          />
        </label>
        
        <label>
          Add the Movie's Genre:
          <select 
            value={newMovie.genre_id} 
            onChange={event => setNewMovie({...newMovie, genre_id: event.target.value})}
          >
            <option value="" disabled>Pick One</option>
            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </label>

        <br/>
        <label>
          Add the Movie's Description:
          <textarea 
            value={newMovie.description}
            onChange={event => setNewMovie({...newMovie, description: event.target.value})}
            placeholder="Movie Description" 
            rows="4" 
            cols ="50"
          ></textarea>
        </label>
      
        <button onClick={handleCancelButton}>Cancel</button>
        <button onClick={saveMovie}>Save</button>
      </form>
    </>
  );
} // end AddMovie

export default AddMovie;