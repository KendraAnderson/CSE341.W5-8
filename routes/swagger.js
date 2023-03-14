const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');

routes.use('/api-docs', requiresAuth(), swaggerUi.serve);
routes.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDoc));

module.exports = routes;
