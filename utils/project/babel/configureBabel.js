const fs = require('fs');

const configureBabel = () => {
    fs.writeFileSync('.babelrc', `{"presets": ["@babel/preset-env"]}`);
};

module.exports = { configureBabel };