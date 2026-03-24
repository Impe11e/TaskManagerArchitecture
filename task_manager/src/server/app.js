import express from "express";
import getUserRouter from "../presentation/users/routes/usersRoutes.js";
import UserController from "../presentation/users/controller/usersController.js";
//import taskRouter from "./routes/tasksRoutes.js";
//import profileRouter from "./routes/profilesRoutes.js";

const app = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", getUserRouter(UserController));
//app.use("/tasks", taskRouter);
//app.use("/profiles", profileRouter);

export default app;
