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
todoRouter.post('/', (req, res) => {
    console.log('POST /todo');
    console.log(req.body);
    let sqlQuery = `
    INSERT INTO "todo"
    ("task", "complete")
    VALUES
    ($1, $2);
    `
    let sqlValues = [req.body.task, req.body.complete];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.log('Error in POST /todo', dbErr);
        })
})


// // DELETE

// // PUT

// //
 module.exports = todoRouter;
