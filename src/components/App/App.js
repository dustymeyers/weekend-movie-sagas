import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Components
import AddMovie from '../AddMovie/AddMovie';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieList from '../MovieList/MovieList';



function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
