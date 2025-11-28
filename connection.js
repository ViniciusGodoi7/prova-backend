const mysql = require("mysql2/promise.js");

const connection = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"",
    database: "cantina"

});

module.exports = connection;