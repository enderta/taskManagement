const { query } = require('../../db.config');

const createTask = async (task_name, description, due_date, status, project_id, assigned_to_user_id) => {
    const response = await query('INSERT INTO tasks (task_name, description, due_date, status, project_id, assigned_to_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [task_name, description, due_date, status, project_id, assigned_to_user_id]);
    return response.rows[0];
}

const getTasks = async () => {
    const response = await query('SELECT * FROM tasks');
    return response.rows;
}

const getTaskById = async (id) => {
    const response = await query('SELECT * FROM tasks WHERE id = $1', [id]);
    return response.rows[0];
}

const updateTask = async (task_name, description, due_date, status, project_id, assigned_to_user_id, id) => {
    const response = await query('UPDATE tasks SET task_name = $1, description = $2, due_date = $3, status = $4, project_id = $5, assigned_to_user_id = $6 WHERE id = $7 RETURNING *', [task_name, description, due_date, status, project_id, assigned_to_user_id, id]);
    return response.rows[0];
}

const deleteTask = async (id) => {
    const response = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return response.rows[0];
}

const getTasksByUserId = async (userId) => {
    const response = await query('SELECT * FROM tasks WHERE assigned_to_user_id = $1', [userId]);
    return response.rows;
}

const updateTaskStatus = async (id, status) => {
    const response = await query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    return response.rows[0];
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