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
    background: 'linear-gradient(45deg, #564d4d 30%, #831010 90%)',
    color: 'white'
  }, 
  appHeaderContainer:{
    width: '100%'
  },
  appHeaderTitle: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    background: 'black',
    color: 'white',
  }
}))


function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" align="center">

      <Grid item className={classes.appHeaderContainer}>
        <Typography className={classes.appHeaderTitle} align="center" variant="h1">
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
