const { prompt } = require('enquirer');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const { createIndexModels, createConfigFile, createFileSequelizeJsInConfig, createFileRoutesJs, createIndexJsServer, createFileDotEnv, createGitIgnore, createResources } = require('../utils/config');

const create = async (name) => {
    let projectName = name;
    if(fs.existsSync(projectName)) {
        if (fs.existsSync(projectName)) {
            console.error(`\nA project with the name '${projectName}' already exists. Please choose a different name.\n`);
        }

        do {
            projectName = (await prompt({
                type: 'input',
                name: 'projectName',
                message: 'Enter a other project name:',
            })).projectName;
    
            if (fs.existsSync(projectName)) {
                console.error(`\nA project with the name '${projectName}' already exists. Please choose a different name.\n`);
            }
        } while (fs.existsSync(projectName));
    }

    const response = await prompt([
        {
            type: 'confirm',
            name: 'useTypescript',
            message: 'Use TypeScript?',
            initial: false,
        },
        {
            type: 'confirm',
            name: 'useRateLimit',
            message: 'Use express-rate-limit?',
            initial: false,
        },
    ]);

    const { useTypescript, useRateLimit } = response;

    console.log(`Creating project '${projectName}'...`);

    // Criar o diretório do projeto
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Estrutura de diretórios padrão
    const folders = [
        'app',
        'app/Http',
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
        'tests',
        "config"
    ];


    // Inicializar o projeto Node.js
    execSync('npm init -y');

    // Instalar dependências
    const devDependencies = ['nodemon', 'sequelize-cli'];
    execSync(`npm install --save-dev ${devDependencies.join(' ')}`);
    
    const dependencies = [
        "express", 
        "pg", 
        "pg-hstore", 
        "sequelize",
        "dotenv",
        "dotenv",
        "sqlite3",
        "mysql2",
        "ejs"
    ];

    if(useRateLimit) {
        dependencies.push("express-rate-limit")
    }


    execSync(`npm install ${dependencies.join(' ')}`);
    
    
    execSync('npm install --save sequelize');
    execSync('npx sequelize-cli init');
    fs.rmSync('./config', { recursive: true });
    fs.rmSync('./models', { recursive: true });
    fs.rmSync('./seeders', { recursive: true });
    fs.rmSync('./migrations', { recursive: true });

    folders.forEach(folder => {
        fs.mkdirSync(folder, { recursive: true });
    });

    createIndexModels();
    createConfigFile();
    createFileRoutesJs();
    createFileDotEnv();
    createGitIgnore();
    createResources();
    createIndexJsServer(useRateLimit);
    createFileSequelizeJsInConfig();


    console.log("\n🔥 project created successfully 🔥");
    console.log(`\n$ cd ${projectName}`);
    console.log("$ npm install\n");
};

module.exports = { create };
