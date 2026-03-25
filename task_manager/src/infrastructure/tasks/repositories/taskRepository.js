// src/infrastructure/repositories/TaskRepository.js
import ITaskRepository from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';
import { TaskMapper } from '../mappers/taskMapper.js';

const db = new Map();
let nextId = 1;

export default class TaskRepository extends ITaskRepository {
  
  async getAll() {
    return Array.from(db.values()).map(raw => TaskMapper.toDomain(raw));
  }

  async findById(id) {
    const raw = db.get(Number(id));
    return raw ? TaskMapper.toDomain(raw) : null;
  }

  async save(taskEntity) {
    const persistence = TaskMapper.toPersistence(taskEntity);
    if (!persistence.id) {
      persistence.id = nextId++;
    }
    
    db.set(persistence.id, persistence);
    return TaskMapper.toDomain(persistence);
  }

  async findByTitle(title) {
    const all = Array.from(db.values());
    const raw = all.find(t => t.title === title);
    return raw ? TaskMapper.toDomain(raw) : null;
  }

  async delete(id) {
    return db.delete(Number(id));
  }
}