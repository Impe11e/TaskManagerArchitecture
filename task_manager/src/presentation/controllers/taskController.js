import CreateTaskDTO from '../dto/task/createTaskDTO.js';
import UpdateTaskDTO from '../dto/task/updateTaskDTO.js';

//   #validateId(id) {
//     const parsedId = parseInt(id, 10);
//     if (!Number.isInteger(parsedId) || parsedId <= 0) {
//       throw new ValidationError('Invalid id');
//     }
//     return parsedId;
//   }

export default class TaskController {
  constructor(
    createTaskUseCase, 
    getAllTasksUseCase, 
    deleteTaskUseCase, 
    getTaskByIdUseCase,
    updateTaskUseCase
  ) {
    this.createTaskUseCase = createTaskUseCase;
    this.getAllTasksUseCase = getAllTasksUseCase;
    this.deleteTaskUseCase = deleteTaskUseCase;
    this.getTaskByIdUseCase = getTaskByIdUseCase;
    this.updateTaskUseCase = updateTaskUseCase;
  }

  async update(req, res) {
    const { id } = req.params;
    const updateTaskDto = new UpdateTaskDTO(req.body);
    
    const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto);
    
    res.status(200).json(updatedTask);
  }

  async getById(req, res) {
    const { id } = req.params;
    const task = await this.getTaskByIdUseCase.execute(id);
    res.status(200).json(task);
  }

  async getAll(_req, res) {
    const tasks = await this.getAllTasksUseCase.execute();
    res.status(200).json(tasks);
  }

  async create(req, res) {
    const taskDto = new CreateTaskDTO(req.body);
    const result = await this.createTaskUseCase.execute(taskDto);
    res.status(201).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;
    await this.deleteTaskUseCase.execute(id);
    res.status(204).send();
  }
}