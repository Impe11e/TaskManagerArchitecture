// src/infrastructure/repositories/TaskRepository.js
import ITaskRepository from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';
import { TaskMapper } from '../mappers/taskMapper.js';
import queries from './queries.js';

export default class TaskRepository extends ITaskRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const res = await this.pool.query(queries.getAll);
    return res.rows.map(r => TaskMapper.toDomain(r));
  }

  async findById(id) {
    const res = await this.pool.query(queries.findById, [id]);
    const row = res.rows[0];
    return row ? TaskMapper.toDomain(row) : null;
  }

  async save(taskEntity) {
    const p = TaskMapper.toPersistence(taskEntity);

    if (!taskEntity.id) {
      const res = await this.pool.query(queries.create, [p.title, p.description, p.status, p.priority, p.due_date, p.user_id]);
      return TaskMapper.toDomain(res.rows[0]);
    }

    const res = await this.pool.query(queries.update, [p.title, p.description, p.status, p.priority, p.due_date, p.user_id, taskEntity.id]);
    return TaskMapper.toDomain(res.rows[0]);
  }

  async findByTitle(title) {
    const res = await this.pool.query(queries.findByTitle, [title]);
    const row = res.rows[0];
    return row ? TaskMapper.toDomain(row) : null;
  }

  async countByStatus(status) {
    const res = await this.pool.query(queries.countByStatus, [status]);
    return res.rows[0]?.count || 0;
  }

  async delete(id) {
    const res = await this.pool.query(queries.deleteById, [id]);
    return res.rowCount > 0;
  }
}