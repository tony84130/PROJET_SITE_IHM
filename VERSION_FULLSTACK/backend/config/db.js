const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "projet_ihm",
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

module.exports = connection;
