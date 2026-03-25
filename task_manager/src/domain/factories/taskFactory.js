import TaskEntity from '../entities/taskEntity.js'; 
import { ValidationError } from '../../errors/customErrors.js';

export default class TaskFactory {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

    async create(data) {
      
    if (data.dueDate && new Date(data.dueDate) < new Date()) {
      throw new ValidationError('Due date cannot be in the past.');
        }    
        
    // complex invariants: DB needed
    // const existingTask = await this.taskRepository.findByTitle(data.title);
    // if (existingTask) {
    //   throw new DomainError("A task with this name already exists.");
    // }
    //
    // const activeTasksCount = await this.taskRepository.countByStatus(TASK_STATUS.IN_PROGRESS);
    //     if (activeTasksCount >= 5) {
    //         throw new Error("Stop multitasking! Finish your current tasks first.");
    //     }

    return new TaskEntity({
      ...data,
      createdAt: new Date()
    });
  }
}