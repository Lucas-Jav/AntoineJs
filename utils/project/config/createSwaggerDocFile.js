const fs = require('fs');

const createSwaggerDocFile = () => {
    fs.writeFileSync('./config/swagger.js', 
`const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const docsRouter = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['routes/api.js'], // Caminho para os arquivos que contêm as rotas com os comentários JSDoc
};

const specs = swaggerJsdoc(options);
docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = docsRouter;
`
    );
};

module.exports = { createSwaggerDocFile };