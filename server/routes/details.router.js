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
      JSON_AGG(genres.name) genres 
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

module.exports = router;