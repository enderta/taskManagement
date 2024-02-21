const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");
const tasksController = require("./tasks.controller");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post("/tasks", verifyToken, tasksController.createTask);
router.get("/tasks", verifyToken, tasksController.getTasks);
router.get("/tasks/:id", verifyToken, tasksController.getTaskById);
router.put("/tasks/:id", verifyToken, tasksController.updateTask);
router.delete("/tasks/:id", verifyToken, tasksController.deleteTask);

module.exports = router;