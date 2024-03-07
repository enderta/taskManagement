const express = require('express');
const router = express.Router();
const tasksController = require('./tasks.controller');

router.post('/tasks', tasksController.createTask);
router.get('/tasks', tasksController.getTasks);
router.put('/task/:id', tasksController.updateTask);
router.delete('/task/:id', tasksController.deleteTask);
router.get('/tasks/user/:userId', tasksController.getTasksByUserId);
router.patch('/task/:id/status', tasksController.updateTaskStatus);
router.get('/task/:id', tasksController.getTaskById);
router.get('/tasks/project/:projectId/user/:userId', tasksController.getTasksByProjectId);

module.exports = router;