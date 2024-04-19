const { prompt } = require('enquirer');
const fs = require('fs');
const { execSync } = require('child_process');

const create = async (name) => {
    let projectName = name;
    if(fs.existsSync(projectName)) {
        if (fs.existsSync(projectName)) {
            console.error(`\nA project with the name '${projectName}' already exists. Please choose a different name.\n`);
        }

        do {
            projectName = (await prompt({
                type: 'input',
                name: 'projectName',
                message: 'Enter a other project name:',
            })).projectName;
    
            if (fs.existsSync(projectName)) {
                console.error(`\nA project with the name '${projectName}' already exists. Please choose a different name.\n`);
            }
        } while (fs.existsSync(projectName));
    }

    const response = await prompt([
        {
            type: 'confirm',
            name: 'useTypescript',
            message: 'Use TypeScript?',
            initial: false,
        },
    ]);

    const { useTypescript } = response;

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
    const dependencies = useTypescript ? ['typescript'] : [];
    execSync(`npm install --save-dev ${dependencies.join(' ')}`);


    // Configurar Babel (opcional)
    if (!useTypescript) {
        fs.writeFileSync('.babelrc', `{"presets": ["@babel/preset-env"]}`);
    }

    // Exemplo de arquivo index.js
    fs.writeFileSync('index.js', '// Seu código aqui');

    // Configuração do banco de dados (exemplo para PostgreSQL)
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
};`);

    console.log("\n🔥 project created successfully 🔥");
    console.log(`\n$ cd ${projectName}`);
    console.log("$ npm install\n");
};

module.exports = { create };

