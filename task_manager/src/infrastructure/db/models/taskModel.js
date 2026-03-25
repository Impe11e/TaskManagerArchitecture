
export default class TaskModel {
  constructor({
    id,
    title,
    description,
    status,
    createdAt,
    priority,
    dueDate,
    // ownerId,
    // projectId,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.priority = priority;
    this.dueDate = dueDate;
    // this.ownerId = ownerId;
    // this.projectId = projectId;
  }
}