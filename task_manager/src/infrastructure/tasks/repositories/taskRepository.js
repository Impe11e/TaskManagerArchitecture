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
    const numId = parseInt(id, 10);
    const res = await this.pool.query(queries.findById, [numId]);
    const row = res.rows[0];
    return row ? TaskMapper.toDomain(row) : null;
  }

  async save(taskEntity) {
    const dbModel = TaskMapper.toPersistence(taskEntity);
    
    const params = [
      dbModel.title,
      dbModel.description,
      dbModel.status,
      dbModel.priority,
      dbModel.dueDate,
      dbModel.userId
    ];

    const query = !taskEntity.id ? queries.create : queries.update;
    if (taskEntity.id) {
      params.push(taskEntity.id);
    }

    const res = await this.pool.query(query, params);
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
    const numId = parseInt(id, 10);
    const res = await this.pool.query(queries.deleteById, [numId]);
    return res.rowCount > 0;
  }
}