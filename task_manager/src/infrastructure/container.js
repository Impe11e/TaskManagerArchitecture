import { TaskRepository } from './repositories/taskRepository.js';

import TaskFactory from '../domain/factories/taskFactory.js';
import CreateTaskUseCase from '../application/use-cases/task/createTaskUsecase.js';
import GetAllTasksUseCase from '../application/use-cases/task/getAllTasksUseCase.js';
import DeleteTaskUseCase from '../application/use-cases/task/deleteTaskUseCase.js';
import GetTaskByIdUseCase from '../application/use-cases/task/getTaskByIdUseCase.js';
import UpdateTaskUseCase from '../application/use-cases/task/updateTaskUseCase.js';
import TaskController from '../presentation/controllers/taskController.js';


const taskRepository = new TaskRepository();

const taskFactory = new TaskFactory(taskRepository);

const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
const getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

export const taskController = new TaskController(
  createTaskUseCase, 
  getAllTasksUseCase, 
  deleteTaskUseCase,
  getTaskByIdUseCase,
  updateTaskUseCase
);
