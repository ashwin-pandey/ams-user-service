const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.USER_DATABASE_NAME,
    multipleStatements: true
});

connection.connect((error) => {
    if (error) {
        console.log(`Error connecting to database: Error: ${error}`);
    } else {
        console.log(`Connected to MySQL database.`);
    }
});

module.exports = connection;
