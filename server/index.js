const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000; // Use the PORT environment variable, default to 3000 if it's not set

dotenv.config();

app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

// Use bodyParser.json() or express.json(), not both
app.use(bodyParser.json());

// Your routes go here
const userRoute = require("./modules/users/users.route");
const tasksRoute = require("./modules/tasks/tasks.route");
const projectsRoute = require("./modules/projects/projects.route");

app.use("/api", userRoute);
app.use("/api", tasksRoute);
app.use("/api", projectsRoute);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});