const { checkProjectExists, promptProjectDetails } = require('../../utils/promptHelpers');
const { setupProjectFolders, setupDependencies } = require('./projectSetup');

const create = async (name) => {
    let projectName = await checkProjectExists(name);
    const { useTypescript, useRateLimit } = await promptProjectDetails();

    console.log(`Creating project '${projectName}'...`);
    setupDependencies(projectName, useTypescript, useRateLimit);
    setupProjectFolders(useRateLimit);

    console.log("\n🔥 Project created successfully 🔥");
    console.log(`\n$ cd ${projectName}`);
    console.log("$ npm install\n");
};

module.exports = { create };