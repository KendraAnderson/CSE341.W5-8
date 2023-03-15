const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDoc));

module.exports = routes;
