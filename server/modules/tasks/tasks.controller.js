const tasksService = require('./tasks.service');

const createTask = async (req, res) => {
    try {
        const {task_name, description, due_date, status, project_id, assigned_to_user_id} = req.body;
        const response = await tasksService.createTask(task_name, description, due_date, status, project_id, assigned_to_user_id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTasks = async (req, res) => {
    try {
        const response = await tasksService.getTasks();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await tasksService.getTaskById(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {task_name, description, due_date, status, project_id, assigned_to_user_id} = req.body;
        const response = await tasksService.updateTask(task_name, description, due_date, status, project_id, assigned_to_user_id, id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await tasksService.deleteTask(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTasksByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await tasksService.getTasksByUserId(userId);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const response = await tasksService.updateTaskStatus(id, status);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByUserId,
    updateTaskStatus
}
