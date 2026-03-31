import ITaskRepository from "../../../src/domain/tasks/repoInterfaces/ITaskRepository.js";

export default class InMemoryTaskRepository extends ITaskRepository {
    constructor() {
        super();
        this.tasks = [];
        this.currentId = 1;
    }

    async save(taskEntity) {
        if (!taskEntity.id) {
            taskEntity.id = this.currentId++;
        }

        const existingIndex = this.tasks.findIndex(t => t.id === taskEntity.id);
        
        if (existingIndex !== -1) {
            this.tasks[existingIndex] = taskEntity;
        } else {
            this.tasks.push(taskEntity);
        }

        return taskEntity;
    }

    async getAll() {
        return [...this.tasks];
    }

    async findById(id) {
        return this.tasks.find(t => t.id === Number(id)) || null;
    }

    async delete(id) {
        const index = this.tasks.findIndex(t => t.id === Number(id));

        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }

    async findByTitle(title) {
        return this.tasks.find(t => t.title === title) || null;
    }

    async countByStatus(status) {
        return this.tasks.filter(t => t.status === status).length;
    }
}
