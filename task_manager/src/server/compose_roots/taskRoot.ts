// infrastructure
import { pool } from '../../infrastructure/pool.js';
import { TaskRepository } from '../../infrastructure/tasks/repositories/taskRepository.js';

// domain
import { TaskFactory } from '../../domain/tasks/factories/taskFactory.js';

// application (handlers)
import { CreateTaskHandler } from '../../application/tasks/commandHandlers/createTaskHandler.js';
import { UpdateTaskHandler } from '../../application/tasks/commandHandlers/updateTaskHandler.js';
import { DeleteTaskHandler } from '../../application/tasks/commandHandlers/deleteTaskHandler.js';
import { GetAllTasksHandler } from '../../application/tasks/queryHandlers/getAllTasksHandler.js';
import { GetTaskByIdHandler } from '../../application/tasks/queryHandlers/getTaskByIdHandler.js';

// controller (presentation)
import { TaskController } from '../../presentation/tasks/controllers/taskController.js';

// eventBus, Subscriptions
import EventBus from '../../modules/eventBus/eventBus';
import NotificationService from '../../modules/notifications/NotificationService';
import NotificationSubscriber from '../../modules/notifications/NotificationSubscriber';

const eventBus = new EventBus();
const notificationService = new NotificationService();
const notificationSubscriber = new NotificationSubscriber(notificationService);

import TaskCreatedEvent from '../../application/tasks/events/created';
import TaskUpdatedEvent from '../../application/tasks/events/updated';

eventBus.subscribe<TaskCreatedEvent>('TaskCreated', (event: TaskCreatedEvent) => notificationSubscriber.handleTaskCreated(event));
eventBus.subscribe<TaskUpdatedEvent>('TaskUpdated', (event: TaskUpdatedEvent) => notificationSubscriber.handleTaskUpdated(event));

const taskRepository = new TaskRepository(pool);
const taskFactory = new TaskFactory(taskRepository);

const createTask = new CreateTaskHandler(taskRepository, taskFactory, eventBus);
const updateTask = new UpdateTaskHandler(taskRepository, eventBus);
const deleteTask = new DeleteTaskHandler(taskRepository, notificationService);
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
