const projectService = require('./projects.service');

const createProject = async (req, res) => {
    try {
        const { project_name, user_id } = req.body;
        const response = await projectService.createProject(project_name, user_id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProjects = async (req, res) => {
   const response = await projectService.getProjects();
    res.json(response);
}

const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await projectService.getProjectById(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const projectByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const response = await projectService.projectByUserId(user_id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { project_name, user_id } = req.body;
        const response = await projectService.updateProject(id, project_name, user_id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await projectService.deleteProject(id);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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
