import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Components
import AddMovie from '../AddMovie/AddMovie';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieList from '../MovieList/MovieList';

// Material-UI
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  appHeaderTitle: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    background: 'black',
    color: 'white',
    width: '100%'
  }
}))


function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" >

      <Grid item className={classes.appHeaderTitle}>
        <Typography display="block" align="center" variant="h1" /*className={classes.appHeaderTitle}*/>
          The Movies Saga!
        </Typography>
      </Grid>

      <Grid item>        
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
      </Grid>
    </Grid>
  );
}


export default App;
