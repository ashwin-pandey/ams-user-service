const collection = require('./collection.constant.js');

module.exports = {
    CREATE_USER_ROLE: async (name) => {
        return `INSERT INTO ${collection.USER_ROLES} (name) VALUES ('${name}');`;
    },

    GET_ALL_USER_ROLES: async () => {
        return `SELECT * FROM ${collection.USER_ROLES};`;
    },

    GET_USER_ROLE_BY_ID: async (id) => {
        return `SELECT * FROM ${collection.USER_ROLES} 
        WHERE id = ${id} AND is_active = true;`;
    },

    GET_USER_ROLE_BY_NAME: async (name) => {
        return `SELECT * FROM ${collection.USER_ROLES} 
        WHERE name = '${name}';`;
    },

    UPDATE_USER_ROLE_NAME: async (id, name) => {
        return `
        UPDATE ${collection.USER_ROLES} 
        SET name='${name}' 
        WHERE id=${id};`;
    },

    DEACTIVATE_USER_ROLE: async (id) => {
        return `
        UPDATE ${collection.USER_ROLES} 
        SET is_active = false 
        WHERE id = ${id};`;
    },

    ACTIVATE_USER_ROLE: async (id) => {
        return `
        UPDATE ${collection.USER_ROLES} 
        SET is_active = true 
        WHERE id = ${id};`;
    }
}