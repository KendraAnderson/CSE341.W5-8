const routes = require('express').Router();
const userController = require('../controllers/user');
const { requiresAuth } = require('express-openid-connect');

// Define a route to get all users
routes.get('/users', requiresAuth(), userController.getAll);

// Define a route to get one user by email
routes.get('/users/:email', requiresAuth(), userController.getUser);

// Define a route to add a new user
routes.post('/users', requiresAuth(), userController.create);

// Define a route to change a user's info by email
routes.put('/users/:email', requiresAuth(), userController.updateUser);

// Define a route to delete a user
routes.delete('/users/:email', requiresAuth(), userController.deleteUser);

module.exports = routes;
