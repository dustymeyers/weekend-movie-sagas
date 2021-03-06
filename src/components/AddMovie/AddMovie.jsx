function AddMovie() {
  return(
    <>
      <h2>Add a Movie to the List!</h2>
      <form>
        <label>
          Add the Movie's Title:
          <input type="text" placeholder="Title of Movie" />
        </label>

        <label>
          Upload the Movie's Poster:
          <input type="text" placeholder="Image Address" />
        </label>
        
        <label>
          Add the Movie's Genre:
          <select>
            <option>Pick One</option>
            <option>Adventure</option>
            <option>Animated</option>
            <option>Biographical</option>
            <option>Comedy</option>
            <option>Disaster</option>
            <option>Drama</option>
            <option>Epic</option>
            <option>Fantasy</option>
            <option>Musical</option>
            <option>Romantic</option>
            <option>Science Fiction</option>
            <option>Space-Opera</option>
            <option>Superhero</option>
          </select>
        </label>

        <br/>
        <label>
          Add the Movie's Description:
          <textarea placeholder="Movie Description" rows="4" cols ="50"></textarea>
        </label>
      
        <button>Cancel</button>
        <button>Save</button>
      </form>
    </>
  );
} // end AddMovie

export default AddMovie;