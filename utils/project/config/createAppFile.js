const fs = require('fs');

const createAppFile = (useRateLimit) => {
    fs.writeFileSync('./config/app.js', 
`const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
${useRateLimit ? "const limiter = require('./rateLimit');" : ""}

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources')));

// route middleware
app.use(routes);

${useRateLimit ? 
`// rateLimit middleware
app.use(limiter);` : ""}

// View engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');


module.exports = app;
`
    );
};

module.exports = { createAppFile };