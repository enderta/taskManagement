const express = require('express');
const router = express.Router();
const tasksController = require('./tasks.controller');

router.post('/', tasksController.createTask);
router.get('/', tasksController.getTasks);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);
router.get('/user/:userId', tasksController.getTasksByUserId);
router.patch('/:id/status', tasksController.updateTaskStatus);


module.exports = router;