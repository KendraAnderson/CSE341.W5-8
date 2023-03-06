//Define constants

const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', require('./meals'));

module.exports = routes;
