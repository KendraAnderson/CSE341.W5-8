//Define constants
const routes = require('express').Router();
const myController = require('../controllers/meal');
const { requiresAuth } = require('express-openid-connect');

// Define route to get all meals
routes.get('/meals', requiresAuth(), myController.getMeals);

// Define route for contacts function
routes.get('/meals/:mealName', requiresAuth(), myController.getOneMeal);

// Define a route for posting to contacts
routes.post('/meals', requiresAuth(), myController.addMeal);

// Define route for changing a meal
routes.put('/meals/:mealName', requiresAuth(), myController.updateMeal);

// Define route for deleting a meal
routes.delete('/meals/:mealName', requiresAuth(), myController.deleteMeal);

module.exports = routes;
