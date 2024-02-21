const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/users', verifyToken,userController.getUsers);

router.get('/user/:id',verifyToken, userController.getUserById);

router.put('/user/:id',verifyToken, userController.updateUser);

router.delete('/user/:id', verifyToken,userController.deleteUser);

module.exports = router;

