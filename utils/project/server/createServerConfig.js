const fs = require('fs');

const createIndexJsServer = (isExpressRateLimit) => {
    fs.writeFileSync('./index.js', 
`
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const morgan = require('morgan');
require('express-group-routes');

const app = express();
const routes = express.Router();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources')));

${isExpressRateLimit ? 
`// Rate limiter
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por IP
});
app.use(limiter);` : ""}


/* Routes */
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");

// Usando as rotas da API com prefixo '/api'
routes.use("/api", apiRoutes);

// Usando as rotas do frontend
routes.use("/", webRoutes);

app.use(routes);

// View engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');


// Server setup
const PORT = 3000;

app.listen(PORT, () => {
    const message = "Server running on [http://localhost:" + PORT + "].";
    const topBottomBorder = '='.repeat(message.length + 8); // Ajuste o número para criar uma borda
    console.log("\\n" + topBottomBorder + "\\n");
    console.log('\x1b[43m INFO \x1b[0m '  + message ); // Cor de fundo azul
    console.log("\\n" + topBottomBorder + "\\n");

    console.log('\x1b[33m' + 'Press Ctrl+C to stop the server' + '\x1b[0m\\n');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port ' + PORT + ' is already in use, trying port ' + (PORT + 1) + '...');
        app.listen(PORT + 1);
    } else {
        console.error(err);
    }
});
`
);


}

module.exports = { createIndexJsServer };
