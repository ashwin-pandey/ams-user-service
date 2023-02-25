const express = require('express');
const router = express.Router();

const userRoleController = require('../controllers/userRole.controller.js');

router.get('/', userRoleController.getAllUserRoles);
router.get('/:id', userRoleController.getUserRoleById);
router.post('/', userRoleController.createUserRole);
router.put('/:id', userRoleController.updateUserRoleName);
router.delete('/:id', userRoleController.deleteUserRole);

module.exports = router;
