const logger = require('../../config/logger.config.js');
const userRoleDb = require('../dbHelper/userRole.dbHelper.js');

module.exports = {
    getAllUserRoles: async (req, res, next) => {
        logger.info(`Step 1: Get all user roles: Start`);
        await userRoleDb.getAllUserRoles((roles) => {
            logger.info(`Step 4: Return all user roles, End`);
            res.status(200);
            res.send(roles);
            return next();
        });
    },
    
    createUserRole: async (req, res, next) => {
        logger.info(`Step 1: Create user role: Start`);
        const roleName = req.body.name;
        await userRoleDb.getUserRoleByName(roleName, async (role) => {
            if (role) {
                logger.error(`Role already exists`);
                if (!role.is_active) {
                    // it is inactive, activate it
                    await userRoleDb.activateUserRole(role.id, (role) => {
                        res.status(201);
                        res.send(role);
                        return next();
                    });
                } else {
                    // it exists and is active
                    res.status(409).send(role);
                    return next();
                }
            } else {
                await userRoleDb.createUserRole(roleName, (role) => {
                    logger.info(`Step 4: Return created user role, End`);
                    res.status(201).send(role);
                    return next();
                });
            }
        });
    },

    updateUserRoleName: async (req, res, next) => {
        const id = req.params.id;
        const name = req.body.name;
        await userRoleDb.updateUserRoleName(id, name, (role) => {
            res.status(200);
            res.send(role);
            return next();
        });
    },

    getUserRoleById: async (req, res, next) => {
        const id = req.params.id;
        await userRoleDb.getUserRoleById(id, async (role) => {
            res.status(200);
            res.send(role);
            return next();
        });
    },

    deleteUserRole: async (req, res, next) => {
        const id = req.params.id;
        await userRoleDb.deActivateUserRole(id, (role) => {
            res.status(204).send(role);
            return next();
        })
    }
}