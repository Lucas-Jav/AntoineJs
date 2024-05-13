#!/usr/bin/env node
const { program } = require('commander');
const { create } = require('./actions/create/index');
const { createDatabase } = require('./actions/db/createDatabase');
const { createMigrationFile } = require('./actions/migration/createMigration');

program
  .command('create <name>')
  .description('Create a new project')
  .action(create);

program
  .command('db:create')
  .description('Create a new database')
  .action(createDatabase);

program
  .command('build')
  .description('Build the project')
  .action(() => {
    console.log('Building project...');
    // Implemente a lógica de construção do projeto aqui
  });

program
  .command('migration:create <name>')
  .description('Create a new migration file')
  .action(createMigrationFile);

program.parse(process.argv);
