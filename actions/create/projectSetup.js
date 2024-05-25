const fs = require('fs');
const { execSync } = require('child_process');
const { installDependencies } = require('./dependencies');
const { createGitIgnore } = require('../../utils/project/git/createGitIgnore');
const { createResources } = require('../../utils/project/Resources/createResources');
const { removeFolders, createFolders } = require('../../utils/files');
const { createDotEnvFiles } = require('../../utils/project/env/createDotEnvFiles');
const { createIndexJsServer } = require('../../utils/project/server/createServerConfig');
const { createFileSequelizeJsInConfig } = require('../../utils/project/config/createFileSequelizeConfig');
const { createIndexModels } = require('../../utils/project/app/Models/createIndexModels');
const { createFileRoutesJs } = require('../../utils/project/routes/createFileRoutesJs');
const { copyPublicFolder } = require('../../utils/project/_public');
const { createSequelizerc } = require('../../utils/project/sequelizerc/createSequelizerc');
const { createPrettierrc } = require('../../utils/project/prettierrc/createPrettierrc');
const { createUserModel } = require('../../utils/project/app/Models/createUserModel');
const { createUserController } = require('../../utils/project/app/Http/Controllers/CreateUserController');
const { createUserMigration } = require('../../utils/project/database/migrations/createUserMigration');
const { createDatabaseFile } = require('../../utils/project/config/createDatabaseFile');
const { createRoutesFile } = require('../../utils/project/config/createRoutesFile');
const { createRateLimitFile } = require('../../utils/project/config/createRateLimitFile');
const { createAppFile } = require('../../utils/project/config/createAppFile');
const { createRouteListAPIFile } = require('../../utils/project/app/Console/createRouteListAPIFile');
const { createSwaggerDocFile } = require('../../utils/project/config/createSwaggerDocFile');
const { createTypeControllerFile } = require('../../utils/project/types/createTypeControllerFile');
const { addReact } = require('../../utils/project/react/addReact');


function setupProjectFolders(useRateLimit, useSwaggerDoc, frontendStack) {
    createFolders([
        'app', 
        'app/Http', 
        'app/Console', 
        'app/Http/Controllers', 
        'app/Http/Middleware',
        'app/Mail', 
        'app/Models', 
        'app/Services', 
        'resources', 
        'resources/css',
        'resources/js', 
        'resources/views', 
        "database", 
        "database/migrations",
        "database/seeders", 
        'storage', 
        'routes',
        'tests', 
        "config",
        "types"
    ]);

    createIndexModels();
    createUserModel();
    createUserController();
    createUserMigration();
    createSequelizerc();
    createPrettierrc();
    createRouteListAPIFile();
    createDatabaseFile();
    createRoutesFile(useSwaggerDoc);
    createFileRoutesJs(useSwaggerDoc);
    if(useRateLimit) createRateLimitFile();
    if (useSwaggerDoc) createSwaggerDocFile();
    createAppFile(useRateLimit);
    createDotEnvFiles();
    createGitIgnore();
    createResources();
    createIndexJsServer();
    createFileSequelizeJsInConfig();
    createTypeControllerFile();
    if (frontendStack !== "None") {
        if (frontendStack === "React") addReact();
    }
}

function setupDependencies(projectName, useTypescript, useRateLimit, useSwaggerDoc, frontendStack) {
    fs.mkdirSync(projectName);
    copyPublicFolder(projectName)

    process.chdir(projectName);
    execSync('npm init -y');

    // Adiciona o script nodemon ao package.json
    const packageJsonPath = './package.json';
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.serve = 'nodemon index.js';
    if(frontendStack !== "None") packageJson.scripts.dev = 'vite';
    packageJson.scripts.format = 'prettier --write .';
    delete packageJson.scripts.test;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    installDependencies(useTypescript, useRateLimit, useSwaggerDoc, frontendStack);
    removeFolders(['./config', './models', './seeders', './migrations']);
}

module.exports = { setupProjectFolders, setupDependencies };