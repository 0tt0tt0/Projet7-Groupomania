//Connexion à la database mysql
var mysql = require('mysql');

async function query(sql, params) {
  const connection = await mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Macb00kpr0',
    database : 'Groupomania'
  });
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = query;



 