const fs = require('fs');

const createSequelizerc = () => {
    fs.writeFileSync('./.sequelizerc', 
`// .sequelizerc

const path = require('path');

module.exports = {
    config: path.resolve('config', 'config.js'),
    'models-path': path.resolve('app', 'Models'),
    'seeders-path': path.resolve('database', 'seeders'),
    'migrations-path': path.resolve('database', 'migrations'),
};`
);


}

module.exports = { createSequelizerc };
