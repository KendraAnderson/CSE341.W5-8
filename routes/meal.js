//Define constants
const routes = require('express').Router();
const myController = require('../controllers/meal');

// Define route to get all meals
routes.get('/meals', myController.getMeals);

// Define route for contacts function
routes.get('/meals/:mealName', myController.getOneMeal);

// Define a route for posting to contacts
routes.post('/meals', myController.addMeal);

// Define route for changing a meal
routes.put('/meals/:mealName', myController.updateMeal);

// Define route for deleting a meal
routes.delete('/meals/:mealName', myController.deleteMeal);

module.exports = routes;
