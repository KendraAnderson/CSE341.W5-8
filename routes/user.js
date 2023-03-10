const routes = require('express').Router();
const userController = require('../controllers/user');

routes.get('/users', userController.getAll);

routes.get('/users/:username', userController.getUser);

routes.post('/users', userController.create);

module.exports = routes;
