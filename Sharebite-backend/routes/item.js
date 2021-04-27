var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/:item_id', function(req, res, callback) {
  const item_id = req.params.item_id;

    var queryStr = `SELECT * FROM items WHERE item_id = ${item_id}`;
    db.query(queryStr, function(err, results) {
      if (err) { throw err; }
      res.json(results);
    });
});

router.post('/', function(req, res, callback) {
  const item_id = req.query.item_id;
  const item_name = req.query.item_name;
  const description = req.query.description;
  const price = req.query.price;
  const section_id = req.query.section_id;
  const junction_id = req.query.junction_id;
  const modifiers_id = req.query.modifiers_id;
  
  var queryStr = `INSERT INTO items (item_id, item_name, description, price, section_id)
  VALUES (${item_id}, ${item_name}, ${description}, ${price},${section_id})`;
  console.log(queryStr);
  db.query(queryStr, function(err, results) {
    if (err) { console.log(err); }
    var queryStr2 =  `INSERT INTO junction (junction_id, modifiers_id, item_id)
    VALUES (${junction_id}, ${modifiers_id}, ${item_id})`;
    db.query(queryStr2,function (error, results) {
      if (error) {console.log(error);}
      res.send("post item success!")
    });
  });
});

router.put('/', function(req, res, callback) {
  const item_id = req.query.item_id;
  const item_name = req.query.item_name;
  const description = req.query.description;
  const price = req.query.price;
  const section_id = req.query.section_id;
  const junction_id = req.query.junction_id;
  const modifiers_id = req.query.modifiers_id;

  var queryStr = `UPDATE items SET item_name = ${item_name}, description = ${description}, price = ${price}, section_id = ${section_id} WHERE item_id = ${item_id}`;
  
  db.query(queryStr,function (error, results) {
	  if (error) { console.log(error); }
    var queryStr2 =  `UPDATE junction SET junction_id = ${junction_id}, modifiers_id = ${modifiers_id} WHERE item_id = ${item_id}`;
    db.query(queryStr2,function (error, results) {
      if (error) {console.log(error);}
      res.send("update item success!")
    });
  });
});

router.delete('/', function (req, res) {
  const item_id = req.query.item_id;
  var queryStr =`DELETE FROM items WHERE item_id = ${item_id}`;

  db.query(queryStr,function (error, results) {
	  if (error) {console.log(error);}
    var queryStr2 =  `DELETE FROM junction WHERE item_id = ${item_id}`;
    db.query(queryStr2,function (error, results) {
      if (error) {console.log(error);}
      res.send("The item has been deleted!!")
    });
	});
});
 

module.exports = router;
