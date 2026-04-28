import { CreateTaskInputDTO } from '../dto/input/createTaskInputDTO.js';
import { UpdateTaskInputDTO } from '../dto/input/updateTaskInputDTO.js';
import { handle } from '../../errors/errorHandler.js';

export class TaskController {
  constructor(
    private createTaskUseCase: any,
    private getAllTasksUseCase: any,
    private deleteTaskUseCase: any,
    private getTaskByIdUseCase: any,
    private updateTaskUseCase: any
  ) {}

  async update(id: number, data: any) {
    try {
      const updateTaskDto = new UpdateTaskInputDTO(data);
      const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto);
      return { status: 200, data: updatedTask };
    } catch (err) {
      return handle(err);
    }
  }

  async getById(id: number) {
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

  async create(data: any) {
    try {
      const taskDto = new CreateTaskInputDTO(data);
      const result = await this.createTaskUseCase.execute(taskDto);
      return { status: 201, data: result };
    } catch (err) {
      return handle(err);
    }
  }

  async delete(id: number) {
    try {
      await this.deleteTaskUseCase.execute(id);
      return { status: 204, data: null };
    } catch (err) {
      return handle(err);
    }
  }
}
