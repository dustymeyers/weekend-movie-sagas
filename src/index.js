import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);

    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);

    yield takeEvery('FETCH_GENRES', fetchGenres);

    yield takeEvery('ADD_MOVIE', addMovie);

    yield takeEvery('UPDATE_MOVIE', updateMovie);
}

function* addMovie(action) {
  // add movie and movie's genre id to DB
  try {
    yield axios.post('/api/movie', action.payload);

    yield put({
      type: 'FETCH_MOVIES'
    })
  } catch (err) {
    console.log('There was an error adding movie:', err);
  }
} // end addMovie

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchGenres() {
  // get genres from the DB
  try {
    const genres = yield axios.get('/api/genre');
    console.log('GET genres:', genres.data);
    yield put({ type: 'SET_GENRES', payload: genres.data })
  } catch (err) {
    console.log('Error getting genres', err);
  }
} // end fetchGenres

function* fetchMovieDetails(action) {
  console.log('action.payload', action.payload);
  
  // movieId from poster click, will be used as URL Param
  const movieId = action.payload;

  // get movie details associated with movieId
  // title, description, poster, genres
  try{
    const movieDetails = yield axios.get(`/api/details/${movieId}`);
    console.log('get movie details:', movieDetails.data);
    yield put({ type: 'SET_MOVIE_DETAILS', payload: movieDetails.data});
  } catch (err) {
    console.log('Error getting movie details', err);
  }
} // end fetchMovieDetails

function* updateMovie(action) {
  // PUT updated values into the DB
  try {
    yield axios.put('/api/details/', action.payload);


  } catch (err) {
    console.log('Error updating movie details', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store details from a specific movie including Genre
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
} // end movieDetails reducers

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
