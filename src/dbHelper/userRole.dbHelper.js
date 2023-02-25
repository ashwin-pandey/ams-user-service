const connection = require('../config/db.config.js');
const logger = require('../config/logger.config.js');
const queryConstant = require('../constants/query.constant.js');

module.exports = {
    getAllUserRoles: async (callback) => {
        const query = await queryConstant.GET_ALL_USER_ROLES();
        logger.info(`Step 2: Query: ${query}`);
        connection.query(query, (error, rows, fields) => {
            if (error) {
                console.log(error);
                throw new Error(error);
            } else {
                logger.info(`Step 3: Query executed successfully`);
                logger.info(rows);
                callback(rows);
            }
        });
    },

    getUserRoleByName: async (roleName, callback) => {
        const query = await queryConstant.GET_USER_ROLE_BY_NAME(roleName);
        connection.query(query, (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(row[0]);
                callback(row[0]);
            }
        })
    },

    getUserRoleById: async (id, callback) => {
        const query = await queryConstant.GET_USER_ROLE_BY_ID(id);
        connection.query(query, (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(row[0]);
                callback(row[0]);
            }
        })
    },

    createUserRole: async (roleName, callback) => {
        const query = await queryConstant.CREATE_USER_ROLE(roleName);
        logger.info(`Step 2: Query: ${query}`);
        connection.query(query, async (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(`Step 3: Query executed successfully`);
                logger.info(row);
                connection.query(await queryConstant.GET_USER_ROLE_BY_ID(row.insertId), (error, data) => {
                    logger.info(data[0]);
                    callback(data[0]);
                })
            }
        })
    },

    updateUserRoleName: async (id, newRoleName, callback) => {
        const query = await queryConstant.UPDATE_USER_ROLE_NAME(id, newRoleName);
        connection.query(query, async (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(`Step 3: Query executed successfully`);
                connection.query(await queryConstant.GET_USER_ROLE_BY_ID(id), (error, data) => {
                    logger.info(data[0]);
                    callback(data[0]);
                });
            }
        });
    },

    deActivateUserRole: async (id, callback) => {
        const query = await queryConstant.DEACTIVATE_USER_ROLE(id);

        // (update query) set is_active to false
        connection.query(query, async (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(`Step 3: Query executed successfully`);
                callback(row);
            }
        });
    },

    activateUserRole: async (id, callback) => {
        const query = await queryConstant.ACTIVATE_USER_ROLE(id);

        // (update query) set is_active to true
        connection.query(query, async (error, row) => {
            if (error) {
                logger.error(error);
                throw new Error(error);
            } else {
                logger.info(`Step 3: Query executed successfully`);
                connection.query(await queryConstant.GET_USER_ROLE_BY_ID(id), (error, data) => {
                    logger.info(data[0]);
                    callback(data[0]);
                });
            }
        });
    }
    
}