const fs = require('fs');

const createFileRoutesJs = (useSwaggerDoc) => {
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

${useSwaggerDoc? 
`apiRoutes.group("/users", (router) => {
    /**
     * @openapi
     * /api/users:
     *   get:
     *     summary: Retrieve a list of users
     *     description: Retrieve a list of users from the database.
     *     responses:
     *       200:
     *         description: A list of users.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     example: 1
     *                   name:
     *                     type: string
     *                     example: John Doe
     *                   email:
     *                     type: string
     *                     example: johndoe@example.com
     */
    router.get('/', UserController.index);

    /**
     * @openapi
     * /api/users/{id}:
     *   get:
     *     summary: Retrieve a single user
     *     description: Retrieve a single user from the database by ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The user ID
     *     responses:
     *       200:
     *         description: A user object
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   example: 1
     *                 name:
     *                   type: string
     *                   example: John Doe
     *                 email:
     *                   type: string
     *                   example: johndoe@example.com
     */
    router.get('/:id', UserController.show);

    /**
     * @openapi
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     description: Create a new user in the database.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: John Doe
     *               email:
     *                 type: string
     *                 example: johndoe@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       200:
     *         description: User created successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   example: 1
     *                 name:
     *                   type: string
     *                   example: John Doe
     *                 email:
     *                   type: string
     *                   example: johndoe@example.com
     */
    router.post('/', UserController.store);

    /**
     * @openapi
     * /api/users/{id}:
     *   put:
     *     summary: Update an existing user
     *     description: Update an existing user in the database by ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: John Doe
     *               email:
     *                 type: string
     *                 example: johndoe@example.com
     *     responses:
     *       200:
     *         description: User updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   example: 1
     *                 name:
     *                   type: string
     *                   example: John Doe
     *                 email:
     *                   type: string
     *                   example: johndoe@example.com
     */
    router.put('/:id', UserController.update);

    /**
     * @openapi
     * /api/users/{id}:
     *   delete:
     *     summary: Delete a user
     *     description: Delete a user from the database by ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The user ID
     *     responses:
     *       204:
     *         description: User deleted successfully.
     */
    router.delete('/:id', UserController.delete);
});` : 
`apiRoutes.group("/users", (router) => {
    router.get('/', UserController.index);
    router.get('/:id', UserController.show);
    router.post('/', UserController.store);
    router.put('/:id', UserController.update);
    router.delete('/:id', UserController.delete);
});`
}

module.exports = apiRoutes;
`);


}

module.exports = { createFileRoutesJs };