import { TaskEntity } from '../entities/taskEntity.js';
import { TaskStatus } from '../../constants/tasks/taskConsts.js';

export interface ITaskRepository {
  create(taskEntity: TaskEntity): Promise<TaskEntity>;
  getAll(): Promise<TaskEntity[]>;
  getById(id: number): Promise<TaskEntity | null>;
  update(id: number, taskEntity: TaskEntity): Promise<TaskEntity>;
  delete(id: number): Promise<boolean>;
  findByTitle(title: string): Promise<TaskEntity | null>;
  countByStatus(status: TaskStatus): Promise<number>;
}
