const fs = require('fs');

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


module.exports = { createFileSequelizeJsInConfig };