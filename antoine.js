#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const { program } = require('commander');

const { prompt } = require('enquirer');

program
  .command('create <name>')
  .description('Create a new project')
  .action(async (name) => {
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

    // Criar o diretório do projeto
    fs.mkdirSync(name);
    process.chdir(name);

    // Estrutura de diretórios padrão
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
      fs.mkdirSync(folder, { recursive: true });
    });

    // Inicializar o projeto Node.js
    execSync('npm init -y');

    // Instalar dependências
    const dependencies = useTypescript ? ['typescript'] : [];
    execSync(`npm install --save-dev @babel/core @babel/preset-env ${dependencies.join(' ')}`);

    // Configurar Babel
    fs.writeFileSync('.babelrc', `{"presets": ["@babel/preset-env"]}`);

    // Exemplo de arquivo index.js
    fs.writeFileSync('index.js', '// Seu código aqui');

    fs.writeFileSync('./config/config.js', 
`module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "123456",
  database: "your-database",
  define: {
      timestamps: true,
  },
};`
)

    console.log('Project created successfully!');
  });

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

program.parse(process.argv);
