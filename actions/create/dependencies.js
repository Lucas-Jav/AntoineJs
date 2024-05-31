const { execSync } = require('child_process');


function installDependencies(useTypescript, useRateLimit, useSwaggerDoc, frontendStack) {
    const dependencies = [
        "express@4.19.2", 
        "pg@8.11.5", 
        "pg-hstore@2.3.4", 
        "body-parser@1.20.2",
        "sequelize@6.37.3",
        "dotenv@16.4.5",
        "sqlite3@5.1.7",
        "mysql2@3.9.7",
        "ejs@3.1.10",
        "morgan@1.10.0",
        "bcrypt@5.1.1",
        "express-group-routes@1.1.0",
        "express-list-endpoints@7.1.0"
    ];

    const devDependencies = [
        'nodemon@3.1.0', 
        'sequelize-cli@6.6.2',
        'prettier@3.2.5'
    ];

    const globalDependencies = [
        'nodemon@3.1.0', 
        'sequelize-cli@6.6.2'
    ];  

    if (frontendStack !== "None") {
        if (frontendStack === "React") {
            const reactDependencies = [
                "@vitejs/plugin-react-refresh@1.3.6", 
                "@vitejs/plugin-react@4.3.0", 
                "react@18.3.1",
                "react-dom@18.3.1",
                "react-refresh@0.14.2"
            ];

            const reactDevDependencies = ["vite@5.0.0"];

            reactDependencies.forEach((dep) => dependencies.push(dep));
            reactDevDependencies.forEach((dep) => devDependencies.push(dep));
        }    
        
        if (frontendStack === "Vue.js") {
            const vueDependencies = [
                "@vitejs/plugin-vue@5.0.5"
            ];

            const vueDevDependencies = ["vite@5.0.0"];

            vueDependencies.forEach((dep) => dependencies.push(dep));
            vueDevDependencies.forEach((dep) => devDependencies.push(dep));
        }
    }

    if (useTypescript) {
        devDependencies.push('typescript', '@types/node', '@types/express');
    }

    if (useRateLimit) {
        dependencies.push("express-rate-limit@7.2.0");
    }

    if (useSwaggerDoc) {
        const swaggerDeps = ["swagger-jsdoc@6.2.8", "swagger-ui-express@5.0.0"];
        swaggerDeps.forEach((dep) => dependencies.push(dep));
    }

    // Verificar e instalar dependências globais se necessário
    globalDependencies.forEach(dep => {
        try {
            execSync(`npm list -g ${dep}`);
        } catch (error) {
            execSync(`npm install -g ${dep}`);
            console.log(`${dep} installed globally.`);
        }
    });

    // Instalar dependências de produção
    execSync(`npm install ${dependencies.join(' ')}`);

    // Instalar dependências de desenvolvimento
    execSync(`npm install --save-dev ${devDependencies.join(' ')}`);
}

module.exports = { installDependencies };