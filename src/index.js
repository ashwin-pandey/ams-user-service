const express = require('express');
const logger = require('./config/logger.config.js');
const app = express();
require('dotenv').config();

app.use(express.json());

const userRoleRoutes = require('./rest/routes/userRole.router.js');

app.use('/user/roles', userRoleRoutes);

const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        logger.error(error);
    } else {
        logger.info(`Server is running on port - ${port}`);
    }
})
