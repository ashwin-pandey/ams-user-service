const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Hello!');
});

const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on port - ${port}`);
    }
})
