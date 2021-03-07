import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Components
import AddMovie from '../AddMovie/AddMovie';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieList from '../MovieList/MovieList';

// Material-UI
import { Typography } from '@material-ui/core';


function App() {
  return (
    <div className="App">
      <Typography variant="h1">The Movies Saga!</Typography>
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

        {/* TODO Add an Edit page */}
      </Router>
    </div>
  );
}


export default App;
