const fs = require('fs');

const createIndexJsServer = (isExpressRateLimit) => {
    fs.writeFileSync('./index.js', 
`
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = express.Router();
const path = require('path');
const morgan = require('morgan');
${isExpressRateLimit ? 
`const rateLimit = require('express-rate-limit')` : ""}

// Middleware para analisar o corpo das solicitações HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do morgan para logar no estilo 'dev'
app.use(morgan('dev'));

${isExpressRateLimit ? 
`const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por IP
});` : ""}

/* Routes */
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");


// Usando as rotas da API com prefixo '/api'
routes.use("/api", apiRoutes);

// Usando as rotas do frontend
routes.use("/", webRoutes);


app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.static(path.join(__dirname, 'resources')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(routes);
${isExpressRateLimit ? 
`app.use(limiter);
` : ""}

const PORT = 3000;

app.listen(PORT, () => {
    const message = "Server running on [http://localhost:" + PORT + "].";
    const topBottomBorder = '='.repeat(message.length + 8); // Ajuste o número para criar uma borda
    console.log("\\n" + topBottomBorder + "\\n");
    console.log('\x1b[43m INFO \x1b[0m '  + message ); // Cor de fundo azul
    console.log("\\n" + topBottomBorder + "\\n");

    console.log('\x1b[33m' + 'Press Ctrl+C to stop the server' + '\x1b[0m\\n');
});
`
);


}

module.exports = { createIndexJsServer };
