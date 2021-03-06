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
   *    movies.title, 
   *    JSON_AGG(genres.name) genres 
   * FROM 
   *    movies
   * JOIN movies_genres 
   *    ON movies.id = movies_genres.movie_id
   * JOIN genres 
   *    ON movies_genres.genre_id = genres.id
   * WHERE 
   *    movies.id = 12
   * GROUP BY 
   *    movies.title;
   */

  const queryText = `
    SELECT 
      movies.title, 
      JSON_AGG(genres.name) genres 
    FROM 
      movies
    JOIN movies_genres 
      ON movies.id = movies_genres.movie_id
    JOIN genres 
      ON movies_genres.genre_id = genres.id
    WHERE 
      movies.id = $1
    GROUP BY movies.title;
  `;

  pool.query(queryText, [movieId])
    .then(result => {
      console.log(`GET /api/details/${movieId} RETURNED:`, result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`ERROR GET /api/details/${movieId} FAILED:`, err);
      res.sendStatus(500);
    })
});

module.exports = router;