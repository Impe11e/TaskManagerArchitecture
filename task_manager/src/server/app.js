// app.js
import express from 'express';
import userRouter from './routes/usersRoutes.js';
import taskRouter from './routes/tasksRoutes.js'

const app = express();

app.set('query parser', 'extended');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/tasks', taskRouter)

export default app;
