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
`module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123456",
    database: "your-database",
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

module.exports = routes;
`
);
}

const createIndexJsServer = () => {
    fs.writeFileSync('./index.js', 
`
const express = require("express");
const routes = require("./routes.js");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000);
`
);
}


module.exports = { 
    initProject, 
    installDependencies, 
    configureBabel, 
    createIndexFile, 
    createConfigFile, 
    createIndexModels,
    createFileSequelizeJsInConfig,
    createFileRoutesJs,
    createIndexJsServer
};

