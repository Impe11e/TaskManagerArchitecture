import express from "express";

import getUserRouter from "../presentation/users/routes/usersRoutes.js";
import getTaskRouter from "../presentation/tasks/routes/tasksRoutes.js";
import getProfileRouter from "../presentation/profiles/routes/profilesRoutes.js";
import userContainer from "./compose_roots/usersRoot.js";
import taskContainer from "./compose_roots/taskRoot.js";
import profileContainer from "./compose_roots/profileRoot.js";

const app = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profiles", getProfileRouter(profileContainer.profileController));
app.use("/users", getUserRouter(userContainer.usersController));
app.use("/tasks", getTaskRouter(taskContainer.taskController));

export default app;
