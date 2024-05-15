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
`
const express = require("express");
const apiRoutes = express.Router();

/* const ExampleController = require("./app/Http/Controllers/ExampleController.js"); */

/* 
apiRoute.post("/example", ExampleController.post);
apiRoute.get("/example", ExampleController.get);
apiRoute.put("/example/:id", ExampleController.put);
apiRoute.delete("/example/:id", ExampleController.delete); 
*/

apiRoutes.get("/", (req, res) => res.send("Hello World!"));

module.exports = apiRoutes;
`);


}

module.exports = { createFileRoutesJs };