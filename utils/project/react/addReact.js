const { createAppJSX } = require("./createAppJSX");
const { createIndexHtml } = require("./createIndexHtml");
const { createMainJSX } = require("./createMainJSX");
const { createViteConfig } = require("./createViteConfig");

const addReact = () => {
    createViteConfig();
    createIndexHtml();
    createMainJSX(); 
    createAppJSX();
}

module.exports = { addReact };