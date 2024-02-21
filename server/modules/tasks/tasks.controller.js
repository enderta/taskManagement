const tasksService = require('./tasks.service');

const createTask = async (req, res) => {
    try {
        const {task_name, description, due_date, status, project_id, assigned_to_user_id} = req.body;
        const response = await tasksService.createTask(task_name, description, due_date, status, project_id, assigned_to_user_id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const getTasks = async (req, res) => {
    try {
        const response = await tasksService.getTasks();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await tasksService.getTaskById(id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {task_name, description, due_date, status, project_id, assigned_to_user_id} = req.body;
        const response = await tasksService.updateTask(task_name, description, due_date, status, project_id, assigned_to_user_id, id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await tasksService.deleteTask(id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}

