const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here

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
    res.sendStatus(403);
  }

});

module.exports = router;
