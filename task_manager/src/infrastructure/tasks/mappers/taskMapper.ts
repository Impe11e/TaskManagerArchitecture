import { TaskEntity } from '../../../domain/tasks/entities/taskEntity.js';
import { TaskModel, TaskModelProps } from '../models/taskModel.js';

export class TaskMapper {
  static toDomain(raw: any): TaskEntity {
    return new TaskEntity({
      id: raw.id || raw._id,
      title: raw.title,
      description: raw.description,
      status: raw.status,
      priority: raw.priority,
      dueDate: raw.due_date || raw.dueDate,
      createdAt: raw.created_at || raw.createdAt,
    });
  }

  static toPersistence(entity: TaskEntity): TaskModel {
    return new TaskModel({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status,
      priority: entity.priority,
      dueDate: entity.dueDate,
      createdAt: entity.createdAt,
    });
  }
}
