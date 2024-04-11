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

module.exports = { initProject, installDependencies, configureBabel, createIndexFile, createConfigFile };
