import express from 'express';
import { getRouter as getTaskRouter } from '../presentation/tasks/routes/tasksRoutes.js';
import taskContainer from './compose_roots/taskRoot.js';

const app = express();

app.set('query parser', 'extended');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", getUserRouter(userContainer.usersController));
app.use('/tasks', getTaskRouter(taskContainer.taskController));
// app.use("/profiles", profileRouter);
export default app;
