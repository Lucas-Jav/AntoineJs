const fs = require('fs');

const createUserController = () => {
    fs.writeFileSync('./app/Http/Controllers/UserController.js', 
`const User = require('../../Models/user.js');
const bcrypt = require('bcrypt');

/** @type {import('../../../types/controller').Controller} */
module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll();

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    },

    async store(req, res) {
        const {
            name,
            email,
            password
        } = req.body;


        try {
            const cryptPassword = await bcrypt.hash(password, 10);
            
            const user = await User.create({
                name,
                email,
                password: cryptPassword
            });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    },

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id);

            return  res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    },

    async update(req, res) {
        const {name, email} = req.body;

        try {
            await User.update(
                {
                    name,
                    email
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )

            return res.send("User updated with success!");
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    },

    async delete(req, res) {

        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.send("User deleted with success!");
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    }
}`
);
}

module.exports = { createUserController };