const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js'); //works?
// GET
todoRouter.get('/', (req, res) => {
    console.log('in get');
    let sqlQuery = `
      SELECT * FROM "todo" 
        ORDER BY "id";
    `;
    pool.query(sqlQuery)
      .then((dbRes) => {
      // Sends back the array of koala objects objects:
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('error getting books', dbErr);
        res.sendStatus(500);
      });
  });
// POST

// DELETE

// PUT

//
module.exports = todoRouter;
