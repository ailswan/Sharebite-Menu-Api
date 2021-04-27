var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/:section_id', function(req, res, callback) {
  const section_id = req.params.section_id;
    var queryStr = `SELECT * FROM section WHERE section_id = ${section_id}`;
 
    db.query(queryStr, function(err, results) {
      if (err) { throw err; }
      res.json(results);
    });
});

router.post('/', function(req, res, callback) {
  const section_id = req.query.section_id;
  const section_name = req.query.section_name;
  const description = req.query.description;
  var queryStr = `INSERT INTO section (section_id, section_name, description)
  VALUES (${section_id}, ${section_name}, ${description})`;

  db.query(queryStr, function(err, results) {
    if (err) { throw err; }
    res.send("post section success!")
  });
});


router.put('/', function(req, res, callback) {
  const section_id = req.query.section_id;
  const section_name = req.query.section_name;
  const description = req.query.description;
  var queryStr = `UPDATE section SET section_name = ${section_name}, description = ${description} WHERE section_id = ${section_id}`;
  
  db.query(queryStr,function (error, results) {
	  if (error) {throw error;}
	  res.send("update section success!")
	});
});

 

router.delete('/', function (req, res) {
  const section_id = req.query.section_id;
  var queryStr =`DELETE FROM section WHERE section_id = ${section_id}`;

  db.query(queryStr,function (error, results) {
	  if (error) {console.log(error);}
    var queryStr2 =  `DELETE FROM items WHERE section_id = ${section_id}`;
    db.query(queryStr2,function (error, results) {
      if (error) {console.log(error);}
      res.send("The section has been deleted!!")
    });
	});
});
 

module.exports = router;
