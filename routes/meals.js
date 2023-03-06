//Define constants

const routes = require('express').Router();
const myController = require('../controllers/meals');

//Define route for name function
routes.get('/meals', myController.getMeals);

//Define route for contacts function
routes.get('/:id', myController.getOneMeal);
/*
//Define a route for posting to contacts
routes.post('/contacts', myController.addContact);

//Define route for changing a contact
routes.put('/:id', myController.updateContact);

//Define route for deleting a contact
routes.delete('/:id', myController.deleteContact);
*/
module.exports = routes;
