import TaskRepository from '../../infrastructure/tasks/repositories/taskRepository.js';
import pool from '../../infrastructure/pool.js';
import TaskFactory from '../../domain/tasks/factories/taskFactory.js';
import CreateTaskUseCase from '../../application/tasks/useCases/createTask.js';
import GetAllTasksUseCase from '../../application/tasks/useCases/getAllTasks.js';
import DeleteTaskUseCase from '../../application/tasks/useCases/deleteTask.js';
import GetTaskByIdUseCase from '../../application/tasks/useCases/getTaskById.js';
import UpdateTaskUseCase from '../../application/tasks/useCases/updateTask.js';
import TaskController from '../../presentation/tasks/controllers/taskController.js';

const taskRepository = new TaskRepository(pool);
const taskFactory = new TaskFactory(taskRepository);
const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
const getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const taskController = new TaskController(createTaskUseCase, getAllTasksUseCase, deleteTaskUseCase, getTaskByIdUseCase, updateTaskUseCase);
export default { taskController };
