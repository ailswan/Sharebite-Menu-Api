var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/:modifiers_id', function(req, res, callback) {
  const modifiers_id = req.params.modifiers_id;

    var queryStr = `SELECT * FROM modifiers WHERE modifiers_id = ${modifiers_id}`;
    db.query(queryStr, function(err, results) {
      if (err) { throw err; }
      res.json(results);
    });
 
});

router.post('/', function(req, res, callback) {
  const modifiers_id = req.query.modifiers_id;
  const description = req.query.description;
  const junction_id = req.query.junction_id;
  const item_id = req.query.item_id;
  var queryStr = `INSERT INTO modifiers (modifiers_id, description)
    VALUES (${modifiers_id}, ${description});`;
 
  db.query(queryStr, function(err, results) {
    if (err) { console.log(err); }
    let queryStrjunction = `INSERT INTO junction (junction_id,modifiers_id, item_id)
    VALUES (${junction_id},${modifiers_id}, ${item_id})`

    db.query(queryStrjunction, function(err, results) {
      if (err) { console.log(err); }
      res.send("post modifiers success!")
    });
  });  
});

router.put('/', function(req, res, callback) {
  const modifiers_id = req.query.modifiers_id;
  const description = req.query.description;
  const junction_id = req.query.junction_id;
  const item_id = req.query.item_id;

  var queryStr = `UPDATE modifiers SET description = ${description}  WHERE modifiers_id = ${modifiers_id}`;
  
  db.query(queryStr,function (error, results) {
	  if (error) { console.log(error); }
    // 选出 junction 中的 modifiers_id
    // 如果 junction_id 是新的
    // if(junction_id)
    var queryStr3 = `SELECT * FROM junction`;
    db.query(queryStr3,function (error, results) {
      if (error) {console.log(error);}
      let findId = false;

      results.map((result) => {
        let id= result.junction_id;
        if (id === junction_id) {
          findId = true;
          var queryStr2 =  `UPDATE junction SET junction_id = ${junction_id}, item_id = ${item_id} WHERE modifiers_id = ${modifiers_id}`;
          db.query(queryStr2,function (error, results) {
            if (error) {console.log(error);}
            res.send("update modifier success!")
          });
        }
      })

      if (findId === false) {
        let queryStrjunction = `INSERT INTO junction (junction_id,modifiers_id, item_id)
        VALUES (${junction_id},${modifiers_id}, ${item_id})`

        db.query(queryStrjunction, function(err, results) {
          if (err) { console.log(err); }
          res.send("post modifiers success!")
        });
      }
        
    });

  });
});


router.delete('/', function (req, res) {
  const modifiers_id = req.query.modifiers_id;
  var queryStr =`DELETE FROM modifiers WHERE modifiers_id = ${modifiers_id}`;

  db.query(queryStr,function (error, results) {
	  if (error) {console.log(error);}
    var queryStr2 =  `DELETE FROM junction WHERE modifiers_id = ${modifiers_id}`;
    db.query(queryStr2,function (error, results) {
      if (error) {console.log(error);}
      res.send("The modifier has been deleted!!")
    });
	});
});
 

module.exports = router;
