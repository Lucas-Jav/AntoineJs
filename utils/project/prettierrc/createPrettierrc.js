const fs = require('fs');

const createPrettierrc = () => {
    fs.writeFileSync('./.prettierrc', 
`{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "useTabs": false
}`
);
}

module.exports = { createPrettierrc };
