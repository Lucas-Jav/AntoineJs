const fs = require('fs');

const createGitIgnore = () => {
    const ignoreContent = 
`.env
node_modules
`
    fs.writeFileSync('./.gitIgnore', ignoreContent);
};

module.exports = { createGitIgnore };