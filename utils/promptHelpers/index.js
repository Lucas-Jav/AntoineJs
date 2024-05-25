const { prompt } = require('enquirer');
const fs = require('fs');

async function checkProjectExists(name) {
    const directoryExists = fs.existsSync(name);
    if (directoryExists) {
        console.error(`A project with the name '${name}' already exists.`);
        process.exit(1);
    }
    return name;
}

async function promptProjectDetails() {
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
        {
            type: 'confirm',
            name: 'useSwaggerDoc',
            message: 'Use swagger-jsdoc?',
            initial: false,
        },
        {
            type: 'select',
            name: 'frontendStack',
            message: 'Which frontend stack would you like to use?',
            choices: ['React', 'Vue.js', 'None']
        }
    ]);

    return response;
}

module.exports = { checkProjectExists, promptProjectDetails };