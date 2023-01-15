const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  if(req.isAuthenticated()) {
  const queryText = 'SELECT * FROM "message" ORDER BY "id";';
  pool.query(queryText)
  .then((result) => {
    console.log('GET success!', result);
    res.send(result.rows);
  }).catch((e) => {
    console.log('Error in GET msg', e);
    res.sendStatus(500)
  })
  }else {
    res.sendStatus(403)
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "message" ("user_id", "content")
                       VALUES ($1, $2) RETURNING "id";`;
      pool.query(queryText, [req.user.id, req.body.content]).then((result) => {
       res.sendStatus(201); 
      }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });                 
  }else {
    res.sendStatus(403)
  }

});

//Reply POST route
router.post('/', (req, res) => {
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    //Need a JOIN here
    const queryText = `INSERT INTO "user_message" ("user_id", "message_id", "reaction")
                       VALUES ($1, $2, $3) RETURNING "id";`;
      pool.query(queryText, [req.user.id, req.body.id, req.body.reaction]).then((result) => {
       res.sendStatus(201); 
      }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });                 
  }else {
    res.sendStatus(403)
  }

});

router.delete("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "message" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("Server Error Deleting Post", e);
      res.sendStatus(500);
    });
  }else {
    res.sendStatus(403);
  }
});

module.exports = router;
