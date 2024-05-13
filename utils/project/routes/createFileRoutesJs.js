const fs = require('fs');

const createFileRoutesJs = () => {
    fs.writeFileSync('./routes.js', 
`
const express = require("express");
const routes = express.Router();

/* const ExampleController = require("./app/Http/Controllers/ExampleController.js"); */

/* 
routes.post("/example", ExampleController.post);
routes.get("/example", ExampleController.get);
routes.put("/example/:id", ExampleController.put);
routes.delete("/example/:id", ExampleController.delete); 
*/

routes.get("/", (req, res) => res.render("welcome"));

module.exports = routes;
`
);}

module.exports = { createFileRoutesJs };