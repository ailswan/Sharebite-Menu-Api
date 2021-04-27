var db = require('../db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, callback) {
  const section_id = req.params.section_id;

    var queryStr = 
    `SELECT Sc.section_id, Sc.section_name, Sc.description AS section_description, 
    It.item_id, It.item_name, It.description AS item_description, It.price,
    Mf.modifiers_id, Mf.description As modifiers_description
    FROM section Sc
    LEFT JOIN items It
    ON Sc.section_id = It.section_id
    LEFT JOIN junction Jc
    ON It.item_id = Jc.item_id
    LEFT JOIN modifiers Mf
    ON Jc.modifiers_id = Mf.modifiers_id
    `;
    db.query(queryStr, function(err, results) {
      if (err) { throw err; }
      
      const entireMenu = {};
      results.map((result) => {
        let id= result.section_id;
        let item_id = result.item_id;
        if(entireMenu[id] !== undefined) {
          let section = entireMenu[id];
          if (section.items[item_id] !== undefined) {
            let item = section.items[item_id];
            item.modifiers.push({
              "id":result.modifiers_id,
              "title":result.modifiers_description
            })
          } else {
            section.items[item_id] = {
              "id":result.item_id,
              "title":result.item_name,
              "modifiers":[
                {
                  "id":result.modifiers_id,
                  "title":result.modifiers_description
                }
              ]
            }
          }

        } else {
          entireMenu[id] = {
            "id":id,
            "title":result.section_name,
            "items":{
              [item_id]:{
                "id":result.item_id,
                "title":result.item_name,
                "modifiers":[
                  {
                    "id":result.modifiers_id,
                    "title":result.modifiers_description
                  }
                ]
              }
            }
          }
        }
      });

      let menu =[];
      for (let sectionKey in entireMenu) {
        let section = entireMenu[sectionKey];
        let sectionObj = {
          "id": section.id,
          "title": section.title,
          "items": []
        }
        for (let itemKey in section.items) {
          let item = section.items[itemKey];
          sectionObj.items.push(item);
        }
        menu.push(sectionObj);
      }
      res.json(menu);
    })


});

module.exports = router;
