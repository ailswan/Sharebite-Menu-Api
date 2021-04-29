# Sharebite-Menu-Api
This backend api was built by myself following the requirements from Sharebite. It took about 1.5 hours. The primary focus was on using MySql and Javascript ES6 to build the Sharebite-Menu-Api.

# Table of Contents 
  >*Start Server*
  >*Tech-stack*
  >*API endpoints*
 
##  1. Running the server
>*install npm packages*
```
$ npm install
```
>*connect Mysql*
```
connect Mysql db in the document : SHAREBITE-BACKEND/db/index.js 
start the Mysql in local terminal
example Mysql data sql command is in : SHAREBITE-BACKEND/drawSQL.sql
```
>*Start the server*
```
npm start
```
##  2. Three entities CRUD
>*Section API CRUD*

url:http://localhost:3000/section/:section_id
```
**GET**
Query Params:
  section_id: "1"

example:
http://localhost:3000/section/1
```
```
**POST**
Query Params:
  section_id: "2"
  section_name: "This is description of Daily Specials."
  description: "Daily Specials"
  
example:
http://localhost:3000/section?section_id="2"&description="This is description of Daily Specials."&section_name="Daily Specials"
```
```
**PUT**
Query Params:
  section_id: "2"
  section_name: "This is description of Daily Specials update."
  description: "Daily Specials update"
  
example:
http://localhost:3000/section?section_id="2"&section_name="Daily Specials update"&description= "This is description of Daily Specials update."
```
```
**DELETE**
Query Params:
  section_id: "2"
  
example:
localhost:3000/section?section_id="2"
```

>*Item API CRUD*

url:http://localhost:3000/item/:item_id
```
**GET**
example of Query Params:
  item_id: "1"

example:
http://localhost:3000/item/1
```
```
**POST**
example of Query Params:
  item_id: "4"
  item_name: "Avocado Sandwich"
  description: "This is description of Avocado Sandwich."
  price: "12.5"
  section_id: "2"
  junction_id: "5"
  modifiers_id: "1"
  
example:
http://localhost:3000/item?item_id="4"&item_name="Avocado Sandwich"&description="This is description of Avocado Sandwich."&price="12.5"&section_id="2"&junction_id="5"&modifiers_id="1"
```
```
**PUT**
example of Query Params:
  item_id: "4"
  item_name: "Avocado Sandwich"
  description: "This is description of Avocado Sandwich."
  price: "16.2"
  section_id: "2"
  junction_id: "5"
  modifiers_id: "6"
  
example:
http://localhost:3000/item?item_id="4"&item_name="Avocado Sandwich"&description="This is description of Avocado Sandwich."&price="16.2"&section_id="2"&junction_id="5"&modifiers_id="6"
```
```
**DELETE**
example of Query Params:
  section_id: "3"
  
example:
localhost:3000/section?section_id="2"
```
>*Modifiers API CRUD*

url:http://localhost:3000/modifiers/:modifiers_id
```
**GET**
example of Query Params:
  item_id: "1"

example:
http://localhost:3000/modifiers/1
```
```
**POST**
example of Query Params:
  modifiers_id: "6"
  description: "Sauce on the side"
  junction_id: "4"
  item_id: "2"
  
example:
http://localhost:3000/modifiers?modifiers_id="6"&description="Sauce on the side"&junction_id="4"&item_id="2"
```
```
**PUT**
example of Query Params:
  modifiers_id: "4"
  junction_id: "5"
  description: "Extra Spicy"
  item_id: "2"
  
example:
http://localhost:3000/modifiers?modifiers_id="4"&junction_id="5"&description="Extra Spicy"&item_id="2"
```
```
**DELETE**
example of Query Params:
  section_id: "6"
  
example:
http://localhost:3000/modifiers?modifiers_id="6"
```
##  3. Items with Modifiers API
```
**GET**
http://localhost:3000/items
```
example results:
[
  {"item_id":1,"item_name":"Soup Lunch","item_description":"This is description of Soup Lunch.","price":"8.5","modifiers":[{"modifiers_id":3,"modifiers_description":"No Spicy"},{"modifiers_id":2,"modifiers_description":"Regular Spicy"},{"modifiers_id":1,"modifiers_description":"Extra Spicy"}]},
  {"item_id":2,"item_name":"Cheese Pizza","item_description":"This is description of Cheese Pizza.","price":"20.8","modifiers":[{"modifiers_id":4,"modifiers_description":"Sauce on the side"}]},
  {"item_id":3,"item_name":"Chicken Sandwich","item_description":"This is description of Chicken Sandwich.","price":"15.2","modifiers":[{"modifiers_id":6,"modifiers_description":"Cream sauce"}]},
  {"item_id":4,"item_name":"Avocado Sandwich","item_description":"This is description of Avocado Sandwich.","price":"16.2","modifiers":[{"modifiers_id":null,"modifiers_description":null}]}]

##  4. Entire Menu API
```
**GET**
http://localhost:3000/items
```
example results:
[
  {
  "id":1,"title":"Lunch Specials","items":
     [
      {"id":1,"title":"Soup Lunch","modifiers":[{"id":3,"title":"No Spicy"},{"id":2,"title":"Regular Spicy"},{"id":1,"title":"Extra Spicy"}]},
      {"id":2,"title":"Cheese Pizza","modifiers":[{"id":4,"title":"Sauce on the side"}]}
     ]
  },
 {
  "id":2,"title":"Daily Specials","items":
    [
      {"id":3,"title":"Chicken Sandwich","modifiers":[{"id":6,"title":"Cream sauce"}]},
      {"id":4,"title":"Avocado Sandwich","modifiers":[{"id":null,"title":null}]}
     ]
  }
]
