import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';
import { TaskEntity } from '../../../domain/tasks/entities/taskEntity.js';
import { TaskMapper } from '../mappers/taskMapper.js';
import { queries } from './queries.js';
import { Pool } from 'pg';

export class TaskRepository implements ITaskRepository {
  constructor(private pool: Pool) {}

  async getAll(): Promise<TaskEntity[]> {
    const res = await this.pool.query(queries.getAll);
    return res.rows.map((r: any) => TaskMapper.toDomain(r));
  }

  async getById(id: number): Promise<TaskEntity | null> {
    const res = await this.pool.query(queries.findById, [id]);
    const row = res.rows[0];
    return row ? TaskMapper.toDomain(row) : null;
  }

  async create(taskEntity: TaskEntity): Promise<TaskEntity> {
    const dbModel = TaskMapper.toPersistence(taskEntity);
    const params = [
      dbModel.title,
      dbModel.description,
      dbModel.status,
      dbModel.priority,
      dbModel.dueDate,
    ];
    const res = await this.pool.query(queries.create, params);
    return TaskMapper.toDomain(res.rows[0]);
  }

  async update(id: number, taskEntity: TaskEntity): Promise<TaskEntity> {
    const dbModel = TaskMapper.toPersistence(taskEntity);
    const params = [
      dbModel.title,
      dbModel.description,
      dbModel.status,
      dbModel.priority,
      dbModel.dueDate,
      String(id),
    ];
    const res = await this.pool.query(queries.update, params);
    return TaskMapper.toDomain(res.rows[0]);
  }

  async findByTitle(title: string): Promise<TaskEntity | null> {
    const res = await this.pool.query(queries.findByTitle, [title]);
    const row = res.rows[0];
    return row ? TaskMapper.toDomain(row) : null;
  }

  async countByStatus(status: string): Promise<number> {
    const res = await this.pool.query(queries.countByStatus, [status]);
    return res.rows[0]?.count || 0;
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.pool.query(queries.deleteById, [id]);
    return (res.rowCount ?? 0) > 0;
    }
    
}
