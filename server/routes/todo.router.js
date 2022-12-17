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
todoRouter.delete('/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;
    let sqlQuery = `
    DELETE FROM "todo"
    WHERE "id"=$1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('Error in Delete:', dbErr);
        })
});


// koalaRouter.delete('/:id', (req, res) => {
//     console.log(req.params);
//     let idToDelete = req.params.id;
//     let sqlQuery = `
//     DELETE FROM "koala"
//     WHERE "id"=$1;
//     `
//     let sqlValues = [idToDelete];
//     pool.query(sqlQuery, sqlValues)
//       .then((dbRes) => {
//         res.sendStatus(200);
//       })
//       .catch((dbErr) => {
//         console.log('broke in DELETE /koala/:id', dbErr);
//         res.sendStatus(500);
//       })
//   });
// // PUT

// //
 module.exports = todoRouter;
