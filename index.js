const express = require('express');
const logger = require('./src/config/logger.config.js');
const app = express();
require('dotenv').config();

app.use(express.json());

const userRoleRoutes = require('./src/rest/routes/userRole.router.js');
const userDetailRoutes = require('./src/rest/routes/userDetail.router.js');

app.use('/user/roles', userRoleRoutes);
app.use('/user/details', userDetailRoutes);

const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        logger.error(error);
    } else {
        logger.info(`Server is running on port - ${port}`);
    }
});
