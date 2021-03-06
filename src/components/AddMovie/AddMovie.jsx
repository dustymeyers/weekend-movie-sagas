import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);

  // local states for form input handling
  const [selectGenre, setSelectGenre] = useState('');
  const [posterInput, setPosterInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);



  return(
    <>
      <h2>Add a Movie to the List!</h2>
      <form>
        <label>
          Add the Movie's Title:
          <input 
            value={titleInput} 
            onChange={(event) => setTitleInput(event.target.value)}
            type="text" 
            placeholder="Title of Movie" 
          />
        </label>

        <label>
          Upload the Movie's Poster:
          <input 
            value={posterInput}
            onChange={(event) => setPosterInput(event.target.value)}
            type="text" 
            placeholder="Image Address" 
          />
        </label>
        
        <label>
          Add the Movie's Genre:
          <select 
            value={selectGenre} 
            onChange={(event) => setSelectGenre(event.target.value)}
          >
            <option value="" disabled>Pick One</option>
            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </label>

        <br/>
        <label>
          Add the Movie's Description:
          <textarea 
            value={descriptionInput}
            onChange={(event) => setDescriptionInput(event.target.value)}
            placeholder="Movie Description" 
            rows="4" 
            cols ="50"
          ></textarea>
        </label>
      
        <button>Cancel</button>
        <button>Save</button>
      </form>
    </>
  );
} // end AddMovie

export default AddMovie;