const fs = require('fs');

const createRoutesFile = (useSwaggerDoc) => {
    fs.writeFileSync('./config/routes.js', 
`const express = require('express');
require('express-group-routes');


const routes = express.Router();

// Routes
const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');
${useSwaggerDoc ? "const docsRouter = require('./swagger');" : ""}

routes.use('/api', apiRoutes);
routes.use('/', webRoutes);
${useSwaggerDoc ? "routes.use('/api-docs', docsRouter);" : ""}

module.exports =  routes;`
    );
};

module.exports = { createRoutesFile };