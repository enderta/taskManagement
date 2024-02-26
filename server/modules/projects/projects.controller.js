const projectService = require('./projects.service');

const createProject = async (req, res) => {
    try {
        await projectService.createProject(req, res);
    } catch (error) {
        console.log(error);
    }
}

const getProjects = async (req, res) => {
    try {
        await projectService.getProjects(req, res);
    } catch (error) {
        console.log(error);
    }
}

const getProjectById = async (req, res) => {
    try {
        await projectService.getProjectById(req, res);
    } catch (error) {
        console.log(error);
    }
}

const projectByUserId = async (req, res) => {
    try {
        await projectService.projectByUserId(req, res);
    } catch (error) {
        console.log(error);
    }
}

const updateProject = async (req, res) => {
    try {
        await projectService.updateProject(req, res);
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    try {
        await projectService.deleteProject(req, res);
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