const { prompt } = require('enquirer');
const { mkdirSync, chdir, writeFileSync } = require('../utils/fsUtils');
const { initProject, installDependencies, configureBabel, createIndexFile, createConfigFile } = require('../utils/config.js');

const create = async (name) => {
    const response = await prompt([
      {
        type: 'confirm',
        name: 'useTypescript',
        message: 'Use TypeScript?',
        initial: false,
      },
    ]);

    const { useTypescript } = response;

    console.log(`Creating project '${name}'...`);

    mkdirSync(name);
    chdir(name);

    const folders = [
      'app',
      'app/Http',
      'app/Models',
      'config',
      'database',
      'public',
      'resources',
      'seeders',
      'resources/views',
      'routes',
      'storage',
      'storage/images',
      'storage/files',
    ];

    folders.forEach(folder => {
      mkdirSync(folder, { recursive: true });
    });

    initProject();
    installDependencies(useTypescript ? ['typescript'] : []);
    configureBabel();
    createIndexFile();
    createConfigFile();

    console.log('Project created successfully!');
};

module.exports = { create };
