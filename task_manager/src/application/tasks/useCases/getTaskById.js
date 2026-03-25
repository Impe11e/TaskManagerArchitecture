import { NotFoundError } from "../../errors/customErrors.js";

export default class GetTaskByIdUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task;
  }
}
