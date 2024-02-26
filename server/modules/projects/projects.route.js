const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");
const projectController = require("./projects.controller");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post("/projects", verifyToken, projectController.createProject);
router.get("/projects", verifyToken, projectController.getProjects);
router.get("/projects/:id", verifyToken, projectController.getProjectById);
router.put("/projects/:id", verifyToken, projectController.updateProject);
router.delete("/projects/:id", verifyToken, projectController.deleteProject);
router.get("/projects/user/:user_id", verifyToken, projectController.projectByUserId);

module.exports = router;

