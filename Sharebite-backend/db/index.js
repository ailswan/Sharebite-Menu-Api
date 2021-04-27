var mysql = require('mysql');


var con = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'menu'
});

con.getConnection(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
  }
});

module.exports = con;