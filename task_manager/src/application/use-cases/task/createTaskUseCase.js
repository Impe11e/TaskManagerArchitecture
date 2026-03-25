export default class CreateTaskUseCase {
  constructor(taskRepository, taskFactory) {
    this.taskRepository = taskRepository;
    this.taskFactory = taskFactory;
  }

  async execute(dto) {
    const task = await this.taskFactory.create(dto);
    await this.taskRepository.save(task);

    return task;
  }
}