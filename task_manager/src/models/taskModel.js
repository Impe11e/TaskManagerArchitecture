import { TASK_STATUS, TASK_PRIORITY } from "./taskConsts.js";

export default class Task {
  constructor({
    id,
    title,
    description,
    status = TASK_STATUS.NEW,
    createdAt = new Date(),
    priority = TASK_PRIORITY.MEDIUM,
    dueDate = null,
//    assignedTo = null,
//    projectId = null
  }) {

    if (!Object.values(TASK_STATUS).includes(status)) {
      throw new Error("Invalid status");
    }
    if (!Object.values(TASK_PRIORITY).includes(priority)) {
      throw new Error("Invalid priority");
    }

    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date(createdAt);
    this.priority = priority;
    this.dueDate = dueDate ? new Date(dueDate) : null;
//    this.assignedTo = assignedTo;
//    this.projectId = projectId;
  }
}