const fs = require('fs');

const createFileRoutesJs = () => {
    fs.writeFileSync('./routes/web.js', 
`
const express = require("express");
const webRoutes = express.Router();

webRoutes.get("/", (req, res) => res.render("welcome"));

module.exports = webRoutes;
`);


    fs.writeFileSync('./routes/api.js', 
`const express = require('express');
const apiRoutes = express.Router();
const UserController = require('../app/Http/Controllers/UserController');

apiRoutes.get('/', (req, res) => res.send('Hello World!'));

apiRoutes.group("/users", (router) => {
    router.get('/', UserController.index);
    router.get('/:id', UserController.show);
    router.post('/', UserController.store);
    router.put('/:id', UserController.update);
    router.delete('/:id', UserController.delete);
});

module.exports = apiRoutes;
`);


}

module.exports = { createFileRoutesJs };