const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const userRoute = require("./modules/users/users.route");
const tasksRoute = require("./modules/tasks/tasks.route");
const projectsRoute = require("./modules/projects/projects.route");


app.use("/api", userRoute);

app.use("/api", tasksRoute);

app.use("/api", projectsRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

