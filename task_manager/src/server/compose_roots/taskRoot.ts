// infrastructure
import { pool } from '../../infrastructure/pool.js';
import { TaskRepository } from '../../infrastructure/tasks/repositories/taskRepository.js';

// domain
import { TaskFactory } from '../../domain/tasks/factories/taskFactory.js';

// application (handlers)
import { CreateTaskHandler } from '../../application/tasks/applicationRequires/commandHandlers/createTaskHandler.js';
import { UpdateTaskHandler } from '../../application/tasks/applicationRequires/commandHandlers/updateTaskHandler.js';
import { DeleteTaskHandler } from '../../application/tasks/applicationRequires/commandHandlers/deleteTaskHandler.js';
import { GetAllTasksHandler } from '../../application/tasks/applicationRequires/queryHandlers/getAllTasksHandler.js';
import { GetTaskByIdHandler } from '../../application/tasks/applicationRequires/queryHandlers/getTaskByIdHandler.js';

// controller (presentation)
import { TaskController } from '../../presentation/tasks/controllers/taskController.js';

// wiring
const taskRepository = new TaskRepository(pool);
const taskFactory = new TaskFactory(taskRepository);

const createTask = new CreateTaskHandler(taskRepository, taskFactory);
const updateTask = new UpdateTaskHandler(taskRepository);
const deleteTask = new DeleteTaskHandler(taskRepository);
const getAllTasks = new GetAllTasksHandler(taskRepository);
const getTaskById = new GetTaskByIdHandler(taskRepository);

const taskController = new TaskController(
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById
);

export default { taskController };
