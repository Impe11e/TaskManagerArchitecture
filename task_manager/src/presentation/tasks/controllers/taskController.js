import CreateTaskDTO from '../dto/createTaskDTO.js';
import UpdateTaskDTO from '../dto/updateTaskDTO.js';
import handle from "../../errors/errorHandler.js";

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

  async update(id, data) {
    try {
      const updateTaskDto = new UpdateTaskDTO(data);
      const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto);
      return { status: 200, data: updatedTask };
    } catch (err) {
      return handle(err);
    }
  }

  async getById(id) {
    try {
      const task = await this.getTaskByIdUseCase.execute(id);
      return { status: 200, data: task };
    } catch (err) {
      return handle(err);
    }
  }

  async getAll() {
    try {
      const tasks = await this.getAllTasksUseCase.execute();
      return { status: 200, data: tasks };
    } catch (err) {
      return handle(err);
    }
  }

  async create(data) {
    try {
      const taskDto = new CreateTaskDTO(data);
      const result = await this.createTaskUseCase.execute(taskDto);
      return { status: 201, data: result };
    } catch (err) {
      return handle(err);
    }
  }

  async delete(id) {
    try {
      await this.deleteTaskUseCase.execute(id);
      return { status: 204, data: null };
    } catch (err) {
      return handle(err);
    }
  }
}