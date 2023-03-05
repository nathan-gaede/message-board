const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "message" ("user_id", "content", "parent_id")
                       VALUES ($1, $2, $3) RETURNING "id";`;
    pool
      .query(queryText, [req.user.id, req.body.content, req.body.parentId])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;