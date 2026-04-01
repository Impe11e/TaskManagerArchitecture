import TaskEntity from '../../../domain/tasks/entities/taskEntity.js';

export class TaskMapper {
  static toDomain(raw) {
    return new TaskEntity({
      id: raw.id || raw._id,
      title: raw.title,
      description: raw.description,
      status: raw.status,
      priority: raw.priority,
      dueDate: raw.due_date || raw.dueDate,
      createdAt: raw.created_at || raw.createdAt,
      userId: raw.user_id || raw.userId,
    });
  }

  static toPersistence(entity) {
    return {
      title: entity.title,
      description: entity.description,
      status: entity.status,
      priority: entity.priority,
      due_date: entity.dueDate,
      user_id: entity.userId,
    };
  }
}