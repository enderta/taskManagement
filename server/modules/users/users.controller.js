const userService = require('./users.service');
const {query} = require("../../db.config");

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const response = await userService.registerUser(username, email, password);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).send('Server error');
    }
}
const getUserById = async (req, res) => {
    try {
        const response = await userService.getUserById(req);
        if (response.error) {
            res.status(404).json({ message: response.error });
        } else {
            res.json(response);
        }
    } catch (error) {
        console.log(error.message || error);
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {username, email, password} = req.body;
        const response = await userService.updateUser(username, email, password, id);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await userService.deleteUser(id);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const loginUser = async (req, res) => {
    try {
        const response = await userService.loginUser(req.body);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}