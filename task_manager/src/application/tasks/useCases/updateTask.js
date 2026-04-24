import { ValidationError, NotFoundError } from "../../errors/applicationErrors.js";

export default class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id, updateData) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if (updateData.title !== undefined) {
      task.title = updateData.title;
    }
    if (updateData.description !== undefined) {
      task.description = updateData.description;
    }
    if (updateData.status !== undefined) {
      task.status = updateData.status;
    }
    if (updateData.priority !== undefined) {
      task.changePriority(updateData.priority);
    }
    if (updateData.dueDate !== undefined) {
      if (updateData.dueDate && new Date(updateData.dueDate) < new Date()) {
        throw new ValidationError('Due date cannot be in the past');
      }
      task.dueDate = updateData.dueDate;
    }
    // if (updateData.userId !== undefined) {
    //   if (!updateData.userId || updateData.userId <= 0) {
    //     throw new ValidationError('User ID must be valid');
    //   }
    //   task.userId = updateData.userId;
    // }
    if (task.title.length < 3) {
        throw new ValidationError("Title must be at least 3 chars.");
    }

    await this.taskRepository.save(task);
    return task;
  }
}
