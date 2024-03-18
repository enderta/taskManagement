const express = require('express');
const router = express.Router();
const tasksController = require('./tasks.controller');
const verifyToken = require("../../middlewares/verifyToken");

router.post('/tasks', verifyToken,tasksController.createTask);
router.get('/tasks', verifyToken,tasksController.getTasks);
router.put('/task/:id',verifyToken ,tasksController.updateTask);
router.delete('/task/:id',verifyToken ,tasksController.deleteTask);
router.get('/tasks/user/:userId',verifyToken ,tasksController.getTasksByUserId);
router.patch('/task/:id/status',verifyToken ,tasksController.updateTaskStatus);
router.get('/task/:id', verifyToken,tasksController.getTaskById);
router.get('/tasks/project/:projectId/user/:userId', verifyToken,tasksController.getTasksByProjectId);

module.exports = router;