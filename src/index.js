const express = require('express');
const app = express();
require('dotenv').config();
const sqlConnection = require('./config/db.config.js');

app.use(express.json());

app.get('/', (req, res) => {
    sqlConnection.query('SELECT * FROM user_roles', (error, rows, field) => {
        console.log(rows);
        return res.send(rows);
    });
});

const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on port - ${port}`);
    }
})
