const { execSync } = require('child_process');


function installDependencies(useTypescript, useRateLimit) {
    const dependencies = [
        "express", 
        "pg", 
        "pg-hstore", 
        "sequelize",
        "dotenv",
        "sqlite3",
        "mysql2",
        "ejs"
    ];

    const devDependencies = [
        'nodemon', 
        'sequelize-cli'
    ];

    if (useTypescript) {
        devDependencies.push('typescript', '@types/node', '@types/express');
    }

    if (useRateLimit) {
        dependencies.push("express-rate-limit");
    }

    // Instalar dependências de produção
    execSync(`npm install ${dependencies.join(' ')}`);

    // Instalar dependências de desenvolvimento
    execSync(`npm install --save-dev ${devDependencies.join(' ')}`);
}

module.exports = { installDependencies };