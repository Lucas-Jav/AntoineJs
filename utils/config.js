const fs = require('fs');
const { execSync } = require('child_process');

const initProject = () => {
    execSync('npm init -y');
};

const installDependencies = (dependencies) => {
    execSync(`npm install --save-dev ${dependencies.join(' ')}`);
};

const configureBabel = () => {
    fs.writeFileSync('.babelrc', `{"presets": ["@babel/preset-env"]}`);
};

const createIndexFile = () => {
    fs.writeFileSync('index.js', '// Seu código aqui');
};

const createConfigFile = () => {
    fs.writeFileSync('./config/config.js', 
`const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dialect: process.env.DB_DATABASE || "postgres", // Default para postgres se não especificado
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_DATABASE_NAME || "your-database",
    define: {
        timestamps: true,
    },
};`
);
};

const createIndexModels = () => {
    fs.writeFileSync('./app/Models/index.js', 
`
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

`
);
}

const createFileSequelizeJsInConfig = () => {
    fs.writeFileSync('./config/sequelize.js', 
`
const Sequelize = require("sequelize");
const database = require("./config.js");

const sequelize = new Sequelize(database);

module.exports = sequelize;

`
);
}

const createFileRoutesJs = () => {
    fs.writeFileSync('./routes.js', 
`
const express = require("express");
const routes = express.Router();

/* const ExampleController = require("./app/Http/Controllers/ExampleController.js"); */

/* 
routes.post("/example", ExampleController.post);
routes.get("/example", ExampleController.get);
routes.put("/example/:id", ExampleController.put);
routes.delete("/example/:id", ExampleController.delete); 
*/

routes.get("/", (req, res) => res.render("welcome"));

module.exports = routes;
`
);}

const createFileDotEnv = () => {
    const envContent = 
`DB_DATABASE=postgres
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE_NAME=Antoinejs
`
    fs.writeFileSync('./.env', envContent);
    fs.writeFileSync('./.env.example', envContent);
}

const createGitIgnore = () => {
    const ignoreContent = 
`.env
node_modules
`
    fs.writeFileSync('./.gitIgnore', ignoreContent);
}

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

const createResources = () => {
    const welcomeContent = 
`<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao AntoineJS</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
    <div class="welcome-container">
        <h1>Bem-vindo ao AntoineJS!</h1>
        <p>Este é o seu novo framework favorito para desenvolvimento full-stack.</p>
    </div>
</body>
</html>
`

    const appContent = 
`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.welcome-container {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
}

p {
    color: #666;
}
`
    fs.writeFileSync('./resources/views/welcome.ejs', welcomeContent);
    fs.writeFileSync('./resources/css/app.css', appContent);
}


module.exports = { 
    initProject, 
    installDependencies, 
    configureBabel, 
    createFileDotEnv,
    createGitIgnore,
    createIndexFile, 
    createConfigFile, 
    createIndexModels,
    createFileSequelizeJsInConfig,
    createFileRoutesJs,
    createResources,
    createIndexJsServer
};

