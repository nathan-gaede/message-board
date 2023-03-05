const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * "DELETE" route
 * The router must be .put and be different from the "UPDATE" route
 * specified by the "/api/msg/delete/:id"
 */

router.put("/delete/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `
    UPDATE "message" SET "content" = $2 
    WHERE "id" = $1 AND "user_id" = $3;
    `;
    pool
      .query(queryText, [req.params.id, "deleted", req.user.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.log("Server Error Deleting Post", e);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "message" ORDER BY "id";';
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((e) => {
        console.log("Error in GET msg", e);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "message" WHERE "id" = $1';
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        console.log("SELECT MSG TO EDIT success", result);
        res.send(result.rows);
      })
      .catch((e) => {
        console.log("Error in select msg to edit", e);
        res.sendStatus(500);
      });
  }
});

/**
 * POST route template
 */

router.post("/", (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "message" ("user_id", "content")
                       VALUES ($1, $2) RETURNING "id";`;
    pool
      .query(queryText, [req.user.id, req.body.content])
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

//Reply POST route
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    //Need a JOIN here
    const queryText = `INSERT INTO "user_message" ("user_id", "message_id", "reaction")
                       VALUES ($1, $2, $3) RETURNING "id";`;
    pool
      .query(queryText, [req.user.id, req.body.id, req.body.reaction])
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

router.put("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "message" SET "content" = $1 WHERE "user_id" = $2 AND "id" = $3;`;
    pool
      .query(queryText, [req.body.content, req.user.id, req.body.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.log("Error in router.put", e);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
