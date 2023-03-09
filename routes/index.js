//Define constants

const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', require('./meal'));
routes.use('/', require('./user'));

module.exports = routes;
