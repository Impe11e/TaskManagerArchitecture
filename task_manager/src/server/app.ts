import express,{type Express} from "express";
import getUserRouter from "../presentation/users/routes/usersRoutes.js";
import container from "./compose_roots/usersRoot.js"
//import taskRouter from "./routes/tasksRoutes.js";
//import profileRouter from "./routes/profilesRoutes.js";

const app: Express = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", getUserRouter(container.usersController));
//app.use("/tasks", taskRouter);
//app.use("/profiles", profileRouter);

export default app;
