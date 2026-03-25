// src/infrastructure/repositories/TaskRepository.js
import ITaskRepository from '../../domain/repositories/ITaskRepository.js';

const db = new Map();
let nextId = 1;

export class TaskRepository extends ITaskRepository {
  
  async getAll() {
    return Array.from(db.values());
  }

  async findById(id) {
    return db.get(Number(id)) || null;
  }

  async save(taskEntity) {
    if (!taskEntity.id) {
      taskEntity.id = nextId++;
    }
    
    db.set(taskEntity.id, taskEntity);
    return taskEntity;
  }

  async findByTitle(title) {
    const all = Array.from(db.values());
    return all.find(t => t.title === title) || null;
  }

  async delete(id) {
    return db.delete(Number(id));
  }
}