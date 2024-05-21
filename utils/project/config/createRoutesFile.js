const fs = require('fs');

const createRoutesFile = () => {
    fs.writeFileSync('./config/routes.js', 
`const express = require('express');
require('express-group-routes');


const routes = express.Router();

// Routes
const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');

routes.use('/api', apiRoutes);
routes.use('/', webRoutes);


module.exports =  routes ;`
    );
};

module.exports = { createRoutesFile };