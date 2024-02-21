const pool = require("../../db.config");

// id | task_name |   description   |  due_date  |   status   | project_id | assigned_to_user_id

const createTask = async (task_name, description, due_date, status, project_id, assigned_to_user_id) => {
    try {
        const response = await pool.query(
            "insert into tasks (task_name, description, due_date, status, project_id, assigned_to_user_id) values ($1, $2, $3, $4, $5, $6) returning *;",
            [task_name, description, due_date, status, project_id, assigned_to_user_id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const getTasks = async () => {
    try {
        const response = await pool.query(
            "select * from tasks;"
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const getTaskById = async (id) => {
    try {
        const response = await pool.query(
            "select * from tasks where id = $1;",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async (task_name, description, due_date, status, project_id, assigned_to_user_id, id) => {
    try {
        const response = await pool.query(
            "update tasks set task_name = $1, description = $2, due_date = $3, status = $4, project_id = $5, assigned_to_user_id = $6 where id = $7;",
            [task_name, description, due_date, status, project_id, assigned_to_user_id, id]
        );
        return "Task updated successfully";
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (id) => {
    try {
        const response = await pool.query(
            "delete from tasks where id = $1;",
            [id]
        );
        return "Task deleted successfully";
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
