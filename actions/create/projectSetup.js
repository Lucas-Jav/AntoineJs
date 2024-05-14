const fs = require('fs');
const { execSync } = require('child_process');
const { installDependencies } = require('./dependencies');
const { createConfigFile } = require('../../utils/project/config/createConfigFile');
const { createGitIgnore } = require('../../utils/project/git/createGitIgnore');
const { createResources } = require('../../utils/project/Resources/createResources');
const { removeFolders, createFolders } = require('../../utils/files');

const { createDotEnvFiles } = require('../../utils/project/env/createDotEnvFiles');
const { createIndexJsServer } = require('../../utils/project/server/createServerConfig');
const { createFileSequelizeJsInConfig } = require('../../utils/project/config/createFileSequelizeConfig');
const { createIndexModels } = require('../../utils/project/app/Models/createIndexModels');
const { createFileRoutesJs } = require('../../utils/project/routes/createFileRoutesJs');



function setupProjectFolders(useRateLimit) {
    createFolders([
        'app', 'app/Http', 'app/Http/Controllers', 'app/Http/Middleware',
        'app/Mail', 'app/Models', 'app/Services', 'resources', 'resources/css',
        'resources/js', 'resources/views', "database", "database/migrations",
        "database/seeders", 'storage', 'tests', "config"
    ]);

    createIndexModels();
    createConfigFile()
    createFileRoutesJs()
    createDotEnvFiles()
    createGitIgnore()
    createResources()
    createIndexJsServer(useRateLimit);
    createFileSequelizeJsInConfig();
}

function setupDependencies(projectName, useTypescript, useRateLimit) {
    fs.mkdirSync(projectName);
    process.chdir(projectName);
    execSync('npm init -y');

    // Adiciona o script nodemon ao package.json
    const packageJsonPath = './package.json';
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.dev = 'nodemon index.js';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    installDependencies(useTypescript, useRateLimit);
    removeFolders(['./config', './models', './seeders', './migrations']);
}

module.exports = { setupProjectFolders, setupDependencies };