const routes = require('express').Router();
const userController = require('../controllers/user');

routes.get('/', userController.getAll);

routes.get('/:username', userController.getUser);

routes.post('/', userController.create);

module.exports = routes;
