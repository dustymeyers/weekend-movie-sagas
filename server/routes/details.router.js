const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  console.log('req.params', req.params);

  // pull movieId from request URL
  const movieId = req.params.id;

  // Using an aggregate function will return one row with all data 
  // rather than multiple rows w/ redundant data
  /**
   * Query should look like:
   * 
   * SELECT 
   *    movies.*, 
   *    JSON_AGG(genres.name) genres -- Puts all associated genres into an array row
   * FROM 
   *    movies
   * JOIN movies_genres 
   *    ON movies.id = movies_genres.movie_id
   * JOIN genres 
   *    ON movies_genres.genre_id = genres.id
   * WHERE 
   *    movies.id = 3
   * GROUP BY 
   *    movies.id;
   */

  const queryText = `
    SELECT 
      movies.*, 
      JSON_AGG(genres.name) genres,
      JSON_AGG(genres.id) genre_id  
    FROM 
      movies
    JOIN movies_genres 
      ON movies.id = movies_genres.movie_id
    JOIN genres 
      ON movies_genres.genre_id = genres.id
    WHERE 
      movies.id = $1
    GROUP BY 
      movies.id;
  `;

  pool.query(queryText, [movieId])
    .then(result => {
      console.log(`GET /api/details/${movieId} RETURNED:`, result.rows);
      /* result.rows looks like:
       * [ {
       * "id": 3,
       * "title": "Captain Marvel",
       * "poster": "images/captain-marvel.jpg",
       * "description": "Captain Marvel is a 2019 American superhero film...",
       * "genres": [ "Biographical" ]
       * } ]
       */
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log(`ERROR GET /api/details/${movieId} FAILED:`, err);

      res.sendStatus(500);
    })
});

router.put('/', (req,res) => {
  console.log('req.body', req.body);
  /**
   * Our fetch data preemptively returns movies.id
   * Will need to be two separate queries
   * Query Should Look like:
   * 
   * UPDATE 
	 *    movies 
   * SET 
   *    "title" = 'Finding Squidward',
   *    "poster" = 'images/finding-nemo.jpg',
   *    "description" = 'Finding Nemo is a ...'
   * WHERE "id" = 4;
   * 
   * UPDATE 
 	 *    movies_genres
   * SET 
	 *    "genre_id" = 4
   * WHERE "movie_id" = 4;
   */

  const updateMovieQuery = `
    UPDATE 
      movies 
    SET 
      "title" = $1,
      "poster" = $2,
      "description" = $3
    WHERE "id" = $4;
  `;

  const updateMovieGenreQuery =`
    UPDATE 
      movies_genres
    SET 
      "genre_id" = $1
    WHERE "movie_id" = $2;
  `;

  // first query updates movie details
  pool.query(updateMovieQuery, [req.body.title, req.body.poster, req.body.description, req.body.id])
    .then(dbRes => {
      console.log('Updated Movie', dbRes);

      // Second query updates genres for that movie
      pool.query(updateMovieGenreQuery, [req.body.genre_id, req.body.id])
      .then(dbRes => {
        res.sendStatus(200);
      }) // catch for second query
      .catch(err => {
        console.log();
      })

    }) // catch for first query
    .catch(err => {
      console.log(`ERROR PUT /api/details/ FAILED:`, err);

      res.sendStatus(500);
    });
})

module.exports = router;