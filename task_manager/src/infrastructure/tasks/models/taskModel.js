
export default class TaskModel {
  constructor({
    id,
    title,
    description,
    status,
    createdAt,
    priority,
    dueDate,
    // userId,
    //projectId
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.priority = priority;
    this.dueDate = dueDate;
    // this.userId = userId;
    //projectId
  }
}