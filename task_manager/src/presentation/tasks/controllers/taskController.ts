import { CreateTaskInputDTO } from '../dto/input/createTaskInputDTO.js';
import { UpdateTaskInputDTO } from '../dto/input/updateTaskInputDTO.js';
import type { CreateTaskOutputDTO } from '../dto/output/createTaskOutputDTO.js';
import type { UpdateTaskOutputDTO } from '../dto/output/updateTaskOutputDTO.js';
import { handle } from '../../errors/errorHandler.js';
import { CreateTaskCommand } from '../../../application/tasks/applicationRequires/commands/createTaskCommand.js';
import { UpdateTaskCommand } from '../../../application/tasks/applicationRequires/commands/updateTaskCommand.js';
import { DeleteTaskCommand } from '../../../application/tasks/applicationRequires/commands/deleteTaskCommand.js';
import { GetAllTasksQuery } from '../../../application/tasks/applicationRequires/queries/getAllTasksQuery.js';
import { GetTaskByIdQuery } from '../../../application/tasks/applicationRequires/queries/getTaskByIdQuery.js';
import type { ICreateHandler } from '../../../application/tasks/applicationRequires/ICreateHandler.js';
import type { IUpdateHandler } from '../../../application/tasks/applicationRequires/IUpdateHandler.js';
import type { IDeleteHandler } from '../../../application/tasks/applicationRequires/IDeleteHandler.js';
import type { IGetAllHandler } from '../../../application/tasks/applicationRequires/IGetAllHandler.js';
import type { IGetByIdHandler } from '../../../application/tasks/applicationRequires/IGetByIdHandler.js';
import type { TaskReadDTO } from '../../../application/tasks/applicationRequires/IGetAllHandler.js';

const toTaskOutputDTO = (task: TaskReadDTO): UpdateTaskOutputDTO => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate,
  createdAt: task.createdAt
});

export class TaskController {
  constructor(
    private createTaskHandler: ICreateHandler,
    private updateTaskHandler: IUpdateHandler,
    private deleteTaskHandler: IDeleteHandler,
    private getAllTasksHandler: IGetAllHandler,
    private getTaskByIdHandler: IGetByIdHandler
  ) {}

  async update(id: number, data: any) {
    try {
      const updateTaskDto = new UpdateTaskInputDTO(data);
      const command = new UpdateTaskCommand(
        id,
        updateTaskDto.title,
        updateTaskDto.description,
        updateTaskDto.status,
        updateTaskDto.priority,
        updateTaskDto.dueDate
      );
      await this.updateTaskHandler.execute(command);
      return { status: 204, data: null };
    } catch (err) {
      return handle(err as any);
    }
  }

  async getById(id: number) {
    try {
      const query = new GetTaskByIdQuery(id);
      const task = await this.getTaskByIdHandler.execute(query);
      if (!task) {
        return { status: 404, data: { message: 'Task not found' } };
      }
      return { status: 200, data: toTaskOutputDTO(task) };
    } catch (err) {
      return handle(err as any);
    }
  }

  async getAll() {
    try {
      const query = new GetAllTasksQuery();
      const tasks = await this.getAllTasksHandler.execute(query);
      return { status: 200, data: tasks.map(toTaskOutputDTO) };
    } catch (err) {
      return handle(err as any);
    }
  }

  async create(data: any) {
    try {
      const taskDto = new CreateTaskInputDTO(data);
      const command = new CreateTaskCommand(
        taskDto.title,
        taskDto.description,
        taskDto.status,
        taskDto.priority,
        taskDto.dueDate
      );
      const result = await this.createTaskHandler.execute(command);
      const output: CreateTaskOutputDTO = { id: result ?? 0 };
      return { status: 201, data: output };
    } catch (err) {
      return handle(err as any);
    }
  }

  async delete(id: number) {
    try {
      const command = new DeleteTaskCommand(id);
      await this.deleteTaskHandler.execute(command);
      return { status: 204, data: null };
    } catch (err) {
      return handle(err as any);
    }
  }
}
