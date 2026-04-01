export default class GetAllTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute() {
    return this.taskRepository.getAll();
  }
}
