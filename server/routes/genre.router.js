const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


// /api/genre GET Endpoint
router.get('/', (req, res) => {
  // This will be our SQL query to get all of the genres from DB
  const textQuery = `SELECT * FROM genres ORDER BY "name";`;

  pool.query(textQuery)
    // wait for a response from database
    .then(dbRes => {
      console.log('DB genres from GET: ', dbRes.rows);
      // send back each row of genres from the DB
      res.send(dbRes.rows);
    })
    // or wait for an error
    .catch(err => {
      console.log('Error with genres GET: ', err);
      res.sendStatus(500);
    });
}); // end router.get

module.exports = router;