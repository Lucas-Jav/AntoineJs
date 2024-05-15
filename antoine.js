#!/usr/bin/env node
const { program } = require('commander');
const { create } = require('./actions/create/index');
const { createDatabase } = require('./actions/db/createDatabase');
const { createMigrationFile } = require('./actions/migration/createMigration');
const packageJson = require('./package.json'); // Import package.json to access the version
/* const fetch = require('node-fetch'); // Import fetch to check for updates

async function checkForUpdates() {
  try {
    const response = await fetch('https://api.github.com/repos/Lucas-Jav/AntoineJs/releases/latest');
    const data = await response.json();
    const latestVersion = data.tag_name;
    if (packageJson.version !== latestVersion) {
      console.log(`A new version of AntoineJs is available: ${latestVersion}. You are currently on ${packageJson.version}. Consider updating to access new features.`);
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
} */

program
.version(packageJson.version, '-v, --version', 'Display project version'); // Use version from package.json

program
  .command('create <name>')
  .description('Create a new project')
  .action(create);

program
  .command('db:create')
  .description('Create a new database')
  .action(createDatabase);

program
  .command('migration:create <name>')
  .description('Create a new migration file')
  .action(createMigrationFile);

program.parse(process.argv);

//checkForUpdates(); // Check for updates after parsing the commands
