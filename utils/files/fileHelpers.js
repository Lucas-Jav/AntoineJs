const fs = require('fs');

function createFolders(folders) {
    folders.forEach(folder => {
        fs.mkdirSync(folder, { recursive: true });
    });
}

function removeFolders(folders) {
    folders.forEach(folder => {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true });
        }
    });
}

module.exports = { createFolders, removeFolders };