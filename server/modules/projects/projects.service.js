const pool = require("../../db.config");

const createProject = async (project_name, user_id) => {
    try {
        const response = await pool.query(
            "INSERT INTO projects (project_name, user_id) VALUES ($1, $2) RETURNING *;",
            [project_name, user_id]
        );
        return response.rows[0];
    } catch (error) {
        throw error;
    }
}

const getProjects = async () => {
    try {
        const response = await pool.query(
            "SELECT * FROM projects;"
        );
        return response.rows;
    } catch (error) {
        throw error;
    }
}

const getProjectById = async (id) => {
    try {
        const response = await pool.query(
            "SELECT * FROM projects WHERE id = $1;",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        throw error;
    }
}

const projectByUserId = async (user_id) => {
    try {
        const response = await pool.query(
            "SELECT p.id as project_id,p.project_name, u.* FROM projects p JOIN users u ON p.user_id = u.id WHERE u.id = $1",
            [user_id]
        );
        console.log(response.rows)
        return response.rows;

    } catch (error) {
        throw error;
    }
}

const updateProject = async (id, project_name, user_id) => {
    try {
        const response = await pool.query(
            "UPDATE projects SET project_name = $1, user_id = $2 WHERE id = $3;",
            [project_name, user_id, id]
        );
        return "Project updated successfully";
    } catch (error) {
        throw error;
    }
}

const deleteProject = async (id) => {
    try {
        const response = await pool.query(
            "DELETE FROM projects WHERE id = $1;",
            [id]
        );
        return "Project deleted successfully";
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    projectByUserId
}
