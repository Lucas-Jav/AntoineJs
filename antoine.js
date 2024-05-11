#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const { program } = require('commander');

const { prompt } = require('enquirer');
const { create } = require('./actions/create');
const path = require('path');
const { createMigrationFile } = require('./actions/migration');
const { createDatabase } = require('./actions/createDatabase');

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
