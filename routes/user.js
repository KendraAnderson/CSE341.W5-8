const routes = require('express').Router();
const userController = require('../controllers/user');

// Define a route to get all users
routes.get('/users', userController.getAll);

// Define a route to get one user by username
routes.get('/users/:username', userController.getUser);

// Define a route to add a new user
routes.post('/users', userController.create);

// Define a route to change a user's info by username
routes.put('/users/:username', userController.updateUser);

// Define a route to delete a user
routes.delete('/users/:username', userController.deleteUser);

module.exports = routes;
