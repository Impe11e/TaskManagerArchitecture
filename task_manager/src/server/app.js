// app.js
import express from 'express';
import router from './routes/usersRoutes';

const app = express();

app.set('query parser', 'extended');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', router);

export default app;
