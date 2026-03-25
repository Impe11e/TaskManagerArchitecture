import express from "express";
import getUserRouter from "../presentation/users/routes/usersRoutes.js";
import getTaskRouter from "../presentation/tasks/routes/tasksRoutes.js";
import userContainer from "./compos_roots/usersRoot.js"
import taskContainer from "./compos_roots/taskRoot.js"
// import profileRouter from "./routes/profilesRoutes.js";

const app = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", getUserRouter(userContainer.usersController));
app.use("/tasks", getTaskRouter(taskContainer.taskController));
// app.use("/profiles", profileRouter);

export default app;
