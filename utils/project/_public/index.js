const fs = require('fs-extra');
const path = require('path');

function copyPublicFolder(projectName) {
    // Define o diretório base como um caminho fixo ou relativo ao local do script
    const baseDir = path.resolve(__dirname, '../../../');  // pega a pasta public na raiz do framework
    const cmdDir = process.cwd(); // pega a rota do lugar onde esta sendo chamado no cmd
    const sourceDir = path.join(baseDir, 'public');
    const destDir = path.join(cmdDir, projectName, 'public');

    // Cria o diretório de origem se não existir
    if (!fs.existsSync(sourceDir)) {
        fs.mkdirSync(sourceDir, { recursive: true });
        // Aqui você pode adicionar arquivos padrão ao diretório public se necessário
    }

    // Cria o diretório de destino se não existir
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Copia o conteúdo do diretório de origem para o destino
    fs.copy(sourceDir, destDir, err => {
        if (err) {
            console.error('Ocorreu um erro ao criar a pasta:', err);
        }
    });
}

module.exports = { copyPublicFolder };
