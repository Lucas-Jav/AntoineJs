#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const { program } = require('commander');

const { prompt } = require('enquirer');
const { create } = require('./actions/create');

program
  .command('create <name>')
  .description('Create a new project')
  .action(create);

program
  .command('build')
  .description('Build the project')
  .action(() => {
    console.log('Building project...');
    // Implemente a lógica de construção do projeto aqui
  });

program
  .command('run <script>')
  .description('Run a script')
  .action((script) => {
    console.log(`Running script '${script}'...`);
    // Implemente a lógica de execução de script aqui
  });

program
  .command('teste')
  .description('Run a script')
  .action((script) => {
    execSync('sequelize-cli init ');
  });

program.parse(process.argv);
