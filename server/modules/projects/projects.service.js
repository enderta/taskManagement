const pool = require("../../db.config");

const createProject = async (req, res) => {
    try {
        const {project_name, user_id} = req.body;
        const response = await pool.query(
            "insert into projects (project_name, user_id) values ($1, $2) returning *;",
            [project_name, user_id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

const getProjects = async (req, res) => {
    try {
        const response = await pool.query(
            "select * from projects;"
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}

const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "select * from projects where id = $1;",
            [id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
}
const projectByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const response = await pool.query(
            "SELECT p.*, u.* FROM projects p JOIN users u ON p.user_id = u.id WHERE u.id = $1",
            [user_id]
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }
}
const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const {project_name, user_id} = req.body;
        const response = await pool.query(
            "update projects set project_name = $1, user_id = $2 where id = $3;",
            [project_name, user_id, id]
        );
        res.json("Project updated successfully");
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "delete from projects where id = $1;",
            [id]
        );
        res.json("Project deleted successfully");
    } catch (error) {
        console.log(error);
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
