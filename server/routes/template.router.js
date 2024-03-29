const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  //Solution 1:
  // TODO Step 1:Add another query that  SELECTS all 
  // entries from user_message table.
  // Step 2: For loop through each message_id. Each 
  // message_id will be a seperate object that is
  // added to a new array. We are making an array
  // of objects.
  // Add each reaction to an array for each message.
  // Step 3: Sum all reactions for each message_id.
  // Possible solution 2: PostgreSQL SUM query
  // reaction by message id. Add each of these
  // values into the message array
  // using a for loop. 
  if(req.isAuthenticated()) {
  const queryText = 'SELECT * FROM "message" ORDER BY "created_at" DESC;';
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

router.get('/:id', (req, res) => {
  if(req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "message" WHERE "id" = $1';
    pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('SELECT MSG TO EDIT success', result);
      res.send(result.rows);
    }).catch((e) => {
      console.log('Error in select msg to edit', e);
      res.sendStatus(500);
    })
  }
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "message" ("user_id", "content", "parent_id")
                       VALUES ($1, $2, $3) RETURNING "id";`;
      pool.query(queryText, [req.user.id, req.body.content, req.body.parent_id]).then((result) => {
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
// router.post('/', (req, res) => {
//   console.log('is authenticated?', req.isAuthenticated());
//   if (req.isAuthenticated()) {
//     //Need a JOIN here
//     const queryText = `INSERT INTO "user_message" ("user_id", "message_id", "reaction")
//                        VALUES ($1, $2, $3) RETURNING "id";`;
//       pool.query(queryText, [req.user.id, req.body.id, req.body.reaction]).then((result) => {
//        res.sendStatus(201); 
//       }).catch((e) => {
//         console.log(e);
//         res.sendStatus(500);
//       });                 
//   }else {
//     res.sendStatus(403)
//   }

// });

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

router.put("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "message" SET "content" = $1 WHERE "user_id" = $2 AND "id" = $3;`;
    pool.query(queryText, [req.body.content, req.user.id, req.body.id ]).then((result) => {
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log('Error in router.put', e);
      res.sendStatus(500);
    });
  }else {
    res.sendStatus(403);
  }
});

module.exports = router;
