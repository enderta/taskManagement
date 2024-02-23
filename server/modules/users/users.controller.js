const userService = require('./users.service');

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
        const response = await userService.getUsers();
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await userService.getUserById(id);
        res.json(response);
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