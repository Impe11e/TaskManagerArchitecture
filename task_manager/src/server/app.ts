import express,{type Express} from "express";
import getUserRouter from "../presentation/users/routes/usersRoutes.js";
import container from "./compose_roots/usersRoot.js"
import { getRouter as getTaskRouter } from '../presentation/tasks/routes/tasksRoutes.js';
import taskContainer from "./compose_roots/taskRoot.js"
//import profileRouter from "./routes/profilesRoutes.js";

const app: Express = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", getUserRouter(container.usersController));
app.use('/tasks', getTaskRouter(taskContainer.taskController));
//app.use("/profiles", profileRouter);

export default app;
