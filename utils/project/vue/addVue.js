const { createAppVue } = require("./createAppVue");
const { createIndexHtml } = require("./createIndexHtml");
const { createMainJS } = require("./createMainJS");
const { createViteConfig } = require("./createViteConfig");

const addVue = () => {
    createViteConfig();
    createIndexHtml();
    createMainJS(); 
    createAppVue();
}

module.exports = { addVue };