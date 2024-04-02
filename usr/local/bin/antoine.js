#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('enquirer');

async function main() {
  const response = await prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name:',
    },
    {
      type: 'confirm',
      name: 'isTypescript',
      message: 'Use TypeScript?',
      initial: false,
    },
  ]);

  const { projectName, isTypescript } = response;

  if (!projectName) {
    console.error('Please provide a project name.');
    process.exit(1);
  }

  console.log(`Creating project '${projectName}'...`);

  // Criar o diretório do projeto
  fs.mkdirSync(projectName);
  process.chdir(projectName);

  // Estrutura de diretórios padrão
  const folders = [
    'app',
    'app/Http',
    'app/Models',
    'config',
    'database',
    'public',
    'resources',
    'resources/views',
    'routes',
    'storage',
    'storage/images',
    'storage/files',
  ];

  folders.forEach(folder => {
    fs.mkdirSync(folder, { recursive: true });
  });

  // Inicializar o projeto Node.js
  execSync('npm init -y');

  // Instalar dependências
  const dependencies = isTypescript ? ['typescript'] : [];
  execSync(`npm install --save-dev @babel/core @babel/preset-env ${dependencies.join(' ')}`);

  // Configurar Babel
  fs.writeFileSync('.babelrc', `{"presets": ["@babel/preset-env"]}`);

  // Exemplo de arquivo index.js
  fs.writeFileSync('index.js', '// Seu código aqui');

  console.log('Project created successfully!');
}

main().catch(console.error);
