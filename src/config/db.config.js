const mysql = require('mysql');
const logger = require('./logger.config');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.USER_DATABASE_NAME,
    multipleStatements: true
});

connection.connect((error) => {
    if (error) {
        logger.error(`Error connecting to database: Error: ${error}`);
        throw new Error(error);
    } else {
        logger.info(`Connected to MySQL database.`);
    }
});

module.exports = connection;
