const projectService = require('./projects.service');

const createProject = async (req, res) => {
    try {
        const {project_name, user_id} = req.body;
        const response = await projectService.createProject(project_name, user_id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const getProjects = async (req, res) => {
    try {
        const response = await projectService.getProjects();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await projectService.getProjectById(id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const {project_name, user_id} = req.body;
        const response = await projectService.updateProject(project_name, user_id, id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await projectService.deleteProject(id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}
