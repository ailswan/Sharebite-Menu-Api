var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, callback) {
  const item_id = req.params.item_id;

  var queryStr = 
  `SELECT It.item_id, It.item_name, It.description AS item_description, It.price,
  Mf.modifiers_id, Mf.description As modifiers_description
  FROM items It
  LEFT JOIN junction Jc
  ON It.item_id = Jc.item_id
  LEFT JOIN modifiers Mf
  ON Jc.modifiers_id = Mf.modifiers_id
  `;
    db.query(queryStr, function(err, results) {
      if (err) { throw err; }
      const items = {};
      results.map((item) => {
        if(items[item.item_id] !== undefined) {
          let modifiers = items[item.item_id].modifiers;
          modifiers.push(
            {
              "modifiers_id":item.modifiers_id,
              "modifiers_description":item.modifiers_description
            }
          );

        } else {
          items[item.item_id] = {
            "item_id":item.item_id,
            "item_name": item.item_name,
            "item_description":item.item_description,
            "price":item.price,
            "modifiers":[
              {
                "modifiers_id":item.modifiers_id,
                "modifiers_description":item.modifiers_description
              }
            ],
          }
        }
      })

      let itemsWithModifiers = [];
      for (let itemKey in items) {
        itemsWithModifiers.push(items[itemKey]);
      }
      res.json(itemsWithModifiers);
    });
 
});

module.exports = router;
