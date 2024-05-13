const fs = require('fs');

const createIndexJsServer = (isExpressRateLimit) => {
    fs.writeFileSync('./index.js', 
`
const express = require("express");
const routes = require("./routes.js");
const path = require('path');
${isExpressRateLimit ? 
`const rateLimit = require('express-rate-limit')` : ""}

${isExpressRateLimit ? 
`const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limite de 100 requisições por IP
});` : ""}

const app = express();

app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.static(path.join(__dirname, 'resources')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(routes);
${isExpressRateLimit ? 
`app.use(limiter);
` : ""}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
});
`
);


}

module.exports = { createIndexJsServer };